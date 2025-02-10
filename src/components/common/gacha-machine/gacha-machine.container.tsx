import React, { useState } from 'react';
import { GachaMachineComponent } from './gacha-machine';
import axios from 'axios';

import { VwblContainer } from '../../../container';

const items = ['/thumbnail_a.jpeg', '/thumbnail_b.png', '/thumbnail_c.png'];

export const GachaMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { vwbl } = VwblContainer.useContainer();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    if (vwbl) await vwbl.sign();
    const signature = vwbl?.signature;

    const maxRetries = 3;
    const retryDelay = 1000; // 1秒 = 1000ミリ秒

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GACHA_API_URL}/pro/mint`,
          {
            ethSig: signature,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        setFetchedData(response.data);

        // gachaId に基づいてアイテム選択
        const gachaId = response.data.gachaId;
        if (gachaId >= 0 && gachaId < items.length) {
          setCurrentItem(items[gachaId - 1]);
        } else {
          console.error('Invalid gachaId:', gachaId);
          setError('無効なガチャIDです。');
        }
        setIsLoading(false);
        return;
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.error('Error 400, not retrying:', error.response.data);
            setError('リクエストエラーが発生しました。時間をおいてもう一度お試しください。');
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
          setError('ガチャの実行に失敗しました。もう一度お試しください。');
        }
      }
    }
  };

  const playGacha = () => {
    setIsPlaying(true);

    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);

    setIsLoading(false);
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
    />
  );
};
