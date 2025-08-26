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
  const [gachaPlayCount, setGachaPlayCount] = useState(0);
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

    // プレイ回数を配列で管理（最大2回）
    const playHistory = localStorage.getItem(`vwbl_gacha_history_${gachaId}`);
    let playCount = 0;
    let latestResult = null;
    
    if (playHistory) {
      try {
        const history = JSON.parse(playHistory);
        if (Array.isArray(history)) {
          playCount = history.length;
          if (playCount > 0) {
            latestResult = history[history.length - 1]; // 最新の結果
          }
        }
      } catch (e) {
        console.warn('Broken gacha history in localStorage. Clearing history data...', e);
        localStorage.removeItem(`vwbl_gacha_history_${gachaId}`);
      }
    } else {
      // 旧形式データの移行処理
      const oldPlayed = localStorage.getItem(`vwbl_gacha_played_${gachaId}`);
      const oldResult = localStorage.getItem(`vwbl_gacha_result_${gachaId}`);
      
      if (oldPlayed === 'true' && oldResult) {
        try {
          const parsedOldResult = JSON.parse(oldResult);
          if (parsedOldResult && parsedOldResult.fetchedData && parsedOldResult.currentItem) {
            // 旧形式を新形式（配列）に変換
            const migratedHistory = [{
              fetchedData: parsedOldResult.fetchedData,
              currentItem: parsedOldResult.currentItem,
              timestamp: Date.now() // タイムスタンプがない場合は現在時刻
            }];
            
            // 新形式で保存
            localStorage.setItem(`vwbl_gacha_history_${gachaId}`, JSON.stringify(migratedHistory));
            
            // 旧データを削除
            localStorage.removeItem(`vwbl_gacha_played_${gachaId}`);
            localStorage.removeItem(`vwbl_gacha_result_${gachaId}`);
            
            // 移行されたデータを設定
            playCount = 1;
            latestResult = migratedHistory[0];
          }
        } catch (e) {
          console.warn('Failed to migrate old gacha data:', e);
          // 移行に失敗した場合は旧データを削除
          localStorage.removeItem(`vwbl_gacha_played_${gachaId}`);
          localStorage.removeItem(`vwbl_gacha_result_${gachaId}`);
        }
      }
    }
    
    setGachaPlayCount(playCount);
    
    // 最新の結果を表示（プレイ履歴がある場合）
    if (latestResult && playCount > 0) {
      setFetchedData(latestResult.fetchedData);
      setCurrentItem(latestResult.currentItem);
    }
  }, []);

  const fetchData = async () => {
    if (!process.env.NEXT_PUBLIC_GACHA_API_URL) {
      setError('環境変数 NEXT_PUBLIC_GACHA_API_URL が未設定です');
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_GACHA_API_URL.replace(/\/+$/, '');

    if (gachaPlayCount >= 2) {
      setError('ガチャは1人2回までです。既に2回プレイ済みです。');
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

        if (!response.data || !response.data.prizeId || !response.data.tokenId || response.status !== 200) {
          console.error('Incomplete response', {
            status: response.status,
            dataKeys: Object.keys(response.data ?? {}),
          });
          setError('ガチャ処理が完全に完了しませんでした。もう一度お試しください。');
          setIsPlaying(false);
          setIsLoading(false);
          return;
        }

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

        // 画面にガチャ結果を表示
        setFetchedData(response.data);
        setCurrentItem(selectedItem);
        
        // ガチャ結果を履歴配列に保存
        const newResult = {
          fetchedData: response.data,
          currentItem: selectedItem,
          timestamp: Date.now(),
        };
        
        const currentHistory = localStorage.getItem(`vwbl_gacha_history_${userGachaId}`);
        let history = [];
        try {
          history = currentHistory ? JSON.parse(currentHistory) : [];
        } catch (e) {
          history = [];
        }
        
        history.push(newResult);
        localStorage.setItem(`vwbl_gacha_history_${userGachaId}`, JSON.stringify(history));
        
        setGachaPlayCount(history.length);
        setIsLoading(false);
        
        return;
      } catch (error: any) {
        if (error.response) {
          const detailMessage = error.response.data?.message ?? '';

          // messageフィールドを優先的にチェック
          if (detailMessage && typeof detailMessage === 'string' && detailMessage.includes('WALLET_ADDRESS_DUPLICATE')) {
            console.error(`Error ${error.response.status}, not retrying - WALLET_ADDRESS_DUPLICATE:`, error.response.data);
            setError('このウォレットアドレスは既に2回使用されています。ガチャは1人2回までとなります。');
            setIsPlaying(false);
            setIsLoading(false);
            return;
          } else if (detailMessage && typeof detailMessage === 'string' && detailMessage.includes('USER_GACHA_ID_DUPLICATE')) {
            console.error(`Error ${error.response.status}, not retrying - USER_GACHA_ID_DUPLICATE:`, error.response.data);
            setError('既に2回プレイ済みです。ガチャは1人2回までとなります。');
            setIsPlaying(false);
            setIsLoading(false);
            try {
              // 既存の履歴から最新の結果を復元
              const saved = localStorage.getItem(`vwbl_gacha_history_${userGachaId}`);
              if (saved) {
                try {
                  const history = JSON.parse(saved);
                  if (Array.isArray(history) && history.length > 0) {
                    const latestResult = history[history.length - 1];
                    if (latestResult && latestResult.fetchedData && latestResult.currentItem) {
                      setFetchedData(latestResult.fetchedData);
                      setCurrentItem(latestResult.currentItem);
                    }
                    setGachaPlayCount(history.length);
                  }
                } catch (e) {
                  console.warn('Failed to parse saved gacha history.', e);
                }
              }
            } catch (e) {
              console.warn('Failed to restore duplicate-play state.', e);
            }
            return;
          }
          
          if (error.response.status === 400) {
            console.error('Error 400, not retrying:', error.response.data);
            setError('リクエストエラーが発生しました。時間をおいてもう一度お試しください。');
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
      hasPlayedGacha={!!fetchedData}
      gachaPlayCount={gachaPlayCount}
    />
  );
};
