import React from 'react';
import { Button, Container, Heading, Image, VStack } from '@chakra-ui/react';
import styles from './gacha-machine.module.css';
import Link from 'next/link';

type GachaMachineComponentProps = {
  isPlaying: boolean;
  currentItem: string | null;
  playGacha: () => void;
  fetchData: () => void;
  fetchedData: any;
};

export const GachaMachineComponent: React.FC<GachaMachineComponentProps> = ({ isPlaying, currentItem, fetchData, fetchedData }) => {
  return (
    <div className={styles.gachaMachine}>
      <VStack>
        <Container maxW='md' bg='purple.50' color='white' centerContent p={10} gap={6}>
          <Image src='/gachagacha.png' alt='' w={200} />
          <Button colorScheme='purple' size='lg' color='white' display='flex' onClick={fetchData}>
            ガチャを回す
          </Button>
        </Container>
        {fetchedData && (
          <div>
            <Heading as='h2' size='md' mr={6}>
              ガチャの中身を見る
            </Heading>

            <Link color='blue.600' href='/account'>
              My Walletのページへ
            </Link>
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
