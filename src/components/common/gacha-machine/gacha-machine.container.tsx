import React, { useState, useEffect } from 'react';
import { GachaMachineComponent } from './gacha-machine';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { VwblContainer } from '../../../container';

const items = [
  '/pre_draw.png',
  '/pre_draw.png',
  '/pre_draw.png',
  '/pre_draw.png',
  '/pre_draw.png',
  '/pre_draw.png',
];

export const GachaMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPlayedGacha, setHasPlayedGacha] = useState(false);
  const [userGachaId, setUserGachaId] = useState<string>('');
  const { vwbl } = VwblContainer.useContainer();

  // ユーザーID管理とガチャ実行制限チェック
  useEffect(() => {
    let gachaId = localStorage.getItem('vwbl_gacha_user_id');
    if (!gachaId) {
      gachaId = uuidv4();
      localStorage.setItem('vwbl_gacha_user_id', gachaId);
    }
    setUserGachaId(gachaId);

    const hasPlayed = localStorage.getItem(`vwbl_gacha_played_${gachaId}`);
    if (hasPlayed === 'true') {
      setHasPlayedGacha(true);
      // 既にプレイ済みの場合、結果を復元
      const savedResult = localStorage.getItem(`vwbl_gacha_result_${gachaId}`);
      if (savedResult) {
        try {
          const result = JSON.parse(savedResult);
          setFetchedData(result.fetchedData);
          setCurrentItem(result.currentItem);
        } catch (e) {
          console.warn('Broken gacha result in localStorage. Clearing result data...', e);
          localStorage.removeItem(`vwbl_gacha_result_${gachaId}`);
        }
      }
    }
  }, []);

  const fetchData = async () => {
    if (!process.env.NEXT_PUBLIC_GACHA_API_URL) {
      setError('環境変数 NEXT_PUBLIC_GACHA_API_URL が未設定です');
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_GACHA_API_URL.replace(/\/+$/, '');

    if (hasPlayedGacha) {
      setError('ガチャは1人1回までです。');
      return;
    }

    if (!userGachaId) {
      setError('ユーザーIDの生成に失敗しました。ページを再読み込みしてください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentItem(null);
    setFetchedData(null);
    setIsPlaying(true);

    let signature: string | undefined;
    try {
      if (vwbl) {
        await vwbl.sign();
        signature = vwbl.signature;
      }
    } catch (e) {
      console.error('Failed to sign.', e);
      setError('ウォレット署名に失敗しました。ウォレット接続を確認してから再度お試しください。');
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }
    if (!signature) {
      setError('署名が取得できませんでした。ウォレット接続を確認してから再度お試しください。');
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    const maxRetries = 3;
    const retryDelay = 1000; // 1秒 = 1000ミリ秒

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.post(
          `${apiBase}/pro/prize`,
          {
            ethSig: signature,
            userGachaId: userGachaId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        setFetchedData(response.data);

        // prizeId に基づいてアイテム選択
        const prizeIdRaw = response.data.prizeId;
        const prizeId = Number(prizeIdRaw);
        let selectedItem: string | null = null;
        if (Number.isInteger(prizeId) && prizeId >= 1 && prizeId <= items.length) {
          selectedItem = items[prizeId - 1];
          setCurrentItem(selectedItem);
        } else {
          console.error('Invalid prizeId:', prizeIdRaw);
          setError('無効な景品IDです。');
          setIsLoading(false);
          return;
        }

        // ガチャ結果をlocalStorageに保存
        localStorage.setItem(`vwbl_gacha_played_${userGachaId}`, 'true');
        localStorage.setItem(
          `vwbl_gacha_result_${userGachaId}`,
          JSON.stringify({
            fetchedData: response.data,
            currentItem: selectedItem,
          }),
        );
        setHasPlayedGacha(true);
        setIsLoading(false);
        
        return;
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.error('Error 400, not retrying:', error.response.data);

            // バックエンドから重複検知エラーの場合
            const rawMessage = error.response.data?.error ?? error.response.data?.message;
            const code = typeof rawMessage === 'string' ? rawMessage.split(':', 1)[0] : '';
            if (code === 'WALLET_ADDRESS_DUPLICATE') {
              setError('このウォレットアドレスは既に使用されています。別のアドレスでお試しください。');
              setIsPlaying(false);
              setIsLoading(false);
              return;
            } else if (code === 'USER_GACHA_ID_DUPLICATE') {
              setError('既にプレイ済みです。ガチャは1人1回までとなります。');
              setIsPlaying(false);
              setHasPlayedGacha(true);
              try {
                localStorage.setItem(`vwbl_gacha_played_${userGachaId}`, 'true');
                const saved = localStorage.getItem(`vwbl_gacha_result_${userGachaId}`);
                if (saved) {
                  try {
                    const result = JSON.parse(saved);
                    if (result && result.fetchedData && result.currentItem) {
                      setFetchedData(result.fetchedData);
                      setCurrentItem(result.currentItem);
                    }
                  } catch (e) {
                    console.warn('Failed to parse saved gacha result.', e);
                  }
                }
              } catch (e) {
                console.warn('Failed to persist/restore duplicate-play state.', e);
              }
            } else {
              setError('リクエストエラーが発生しました。時間をおいてもう一度お試しください。');
            }
            setIsPlaying(false);
            setIsLoading(false);
            return;
          }
          console.error('Error fetching data:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Error fetching data: No response received');
        } else {
          console.error('Error fetching data:', error.message);
        }
        if (attempt < maxRetries) {
          console.log(`Retrying in ${retryDelay}ms... (Attempt ${attempt} of ${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          console.error('Max retries reached. Giving up.');
          setError('時間をおいてもう一度お試しください。');
          setIsPlaying(false);
          setIsLoading(false);
        }
      }
    }
  };

  const playGacha = () => {
    fetchData();
  };

  return (
    <GachaMachineComponent
      isPlaying={isPlaying}
      currentItem={currentItem}
      playGacha={playGacha}
      fetchData={fetchData}
      fetchedData={fetchedData}
      isLoading={isLoading}
      error={error}
      hasPlayedGacha={hasPlayedGacha}
    />
  );
};
