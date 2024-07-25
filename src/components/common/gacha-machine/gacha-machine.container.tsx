import React, { useState } from 'react';
import { GachaMachineComponent } from './gacha-machine';
import axios from 'axios';

import { VwblContainer } from '../../../container';
const items = ['/thumbnail_a.jpeg', '/thumbnail_b.png', '/thumbnail_c.png'];

export const GachaMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const { vwbl } = VwblContainer.useContainer();

  const fetchData = async () => {
    console.log('sign...');
    if (vwbl) await vwbl.sign();
    const signature = vwbl?.signature;
    console.log('Fetching data...');

    const maxRetries = 3;
    const retryDelay = 1000; // 1秒 = 1000ミリ秒

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GATYA_API_HOST}/pro/mint`,
          {
            ethSig: signature,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('Fetched data:', response.data);
        setFetchedData(response.data);
        return; // 成功したら関数を終了
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.error('Error 400, not retrying:', error.response.data);
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
        }
      }
    }
  };

  const playGacha = () => {
    console.log('Playing gacha...');
    setIsPlaying(true);
    setCurrentItem(null);

    setTimeout(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setCurrentItem(randomItem);
    }, 1500);

    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <GachaMachineComponent
      isPlaying={isPlaying}
      currentItem={currentItem}
      playGacha={playGacha}
      fetchData={fetchData}
      fetchedData={fetchedData}
    />
  );
};
