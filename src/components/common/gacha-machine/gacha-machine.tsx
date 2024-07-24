import React, { useState } from 'react';
import styles from './gacha-machine.module.css';
import { Button, Container, Image, VStack } from '@chakra-ui/react';

const items = ['/sample1.png', '/sample2.png', '/sample3.png'];

const GachaMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  const playGacha = () => {
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
    <div className={styles.gachaMachine}>
      <VStack>
        <Container maxW='md' bg='purple.50' color='white' centerContent p={10} gap={6}>
          <Image src='/gachagacha.png' alt='' w={200} />
          <Button colorScheme='purple' size='lg' color='white' display='flex' onClick={playGacha} disabled={isPlaying}>
            ガチャを回す
          </Button>
        </Container>
      </VStack>
      <div className={`${styles.capsule} ${isPlaying ? styles.playing : ''}`}>
        <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
        {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
      </div>
    </div>
  );
};

export default GachaMachine;
