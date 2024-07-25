import React from 'react';
import { Button, Container, Image, VStack } from '@chakra-ui/react';
import styles from './gacha-machine.module.css';

type GachaMachineComponentProps = {
  isPlaying: boolean;
  currentItem: string | null;
  playGacha: () => void;
  fetchData: () => void;
  fetchedData: any;
};

export const GachaMachineComponent: React.FC<GachaMachineComponentProps> = ({ isPlaying, currentItem, playGacha, fetchData, fetchedData }) => {
  console.log('GachaMachine rendered'); // デバッグ用のログ
  return (
    <div className={styles.gachaMachine}>
      <VStack>
        <Container maxW='md' bg='purple.50' color='white' centerContent p={10} gap={6}>
          <Image src='/gachagacha.png' alt='' w={200} />
          <Button colorScheme='purple' size='lg' color='white' display='flex' onClick={playGacha} disabled={isPlaying}>
            ガチャを回す
          </Button>
          <Button colorScheme='blue' size='lg' color='white' display='flex' onClick={fetchData}>
            データ取得
          </Button>
        </Container>
        {fetchedData && (
          <div>
            <h2>Fetched Data:</h2>
            <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
          </div>
        )}
      </VStack>
      <div className={`${styles.capsule} ${isPlaying ? styles.playing : ''}`}>
        <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
        {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
      </div>
    </div>
  );
};
