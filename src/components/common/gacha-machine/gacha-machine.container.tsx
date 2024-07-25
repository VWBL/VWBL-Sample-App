import React, { useState } from 'react';
import { GachaMachineComponent } from './gacha-machine';
import axios from 'axios';

import { signToProtocol } from 'vwbl-sdk';
import { VwblContainer } from '../../../container';
import Web3 from 'web3';
const items = ['/thumbnail_a.jpeg', '/thumbnail_b.png', '/thumbnail_c.png'];

export const GachaMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const { provider } = VwblContainer.useContainer();
  const message = 'Sign Message: Get VWBL Gacha';
  console.log('GachaMachineContainer rendered');

  const fetchData = async () => {
    console.log('sign...');
    const web3 = new Web3(provider);
    console.log('Fetching data...');
    const signature = await signToProtocol(web3, message);
    console.log('Signature:', signature);

    console.log('Fetching data...');
    try {
      const response = await axios.post(
        'https://x92s8btj0m.execute-api.ap-northeast-1.amazonaws.com/pro/mint',
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
    } catch (error: any) {
      if (error.response) {
        console.error('Error fetching data:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Error fetching data: No response received');
      } else {
        console.error('Error fetching data:', error.message);
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
