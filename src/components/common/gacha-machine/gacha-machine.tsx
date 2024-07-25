import React from 'react';
import { Alert, AlertIcon, Button, Container, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import styles from './gacha-machine.module.css';
import Link from 'next/link';

type GachaMachineComponentProps = {
  isPlaying: boolean;
  currentItem: string | null;
  playGacha: () => void;
  fetchData: () => void;
  fetchedData: any;
  isLoading: boolean;
  error: string | null;
};

export const GachaMachineComponent: React.FC<GachaMachineComponentProps> = ({
  isPlaying,
  currentItem,
  fetchData,
  fetchedData,
  isLoading,
  error,
}) => {
  return (
    <div className={styles.gachaMachine}>
      <VStack>
        <Container maxW='md' bg='purple.50' color='white' centerContent p={10} gap={6}>
          <Image src='/gachagacha.png' alt='' w={200} />
          <Button colorScheme='purple' size='lg' color='white' display='flex' onClick={fetchData}>
            ガチャを回す
          </Button>
        </Container>
        {isLoading && (
          <VStack mt={4}>
            <Spinner size='xl' color='purple.500' />
            <Text>ガチャ実行中...</Text>
            <Text>ページ遷移せずに10秒ほどお待ち下さい。</Text>
          </VStack>
        )}
        {error && (
          <Alert status='error'>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {fetchedData && (
          <VStack mt={10}>
            <Heading as='h2' size='md' mr={6}>
              ガチャの中身を見る
            </Heading>
            <Text>
              ガチャの中身は
              <Link href='/account'>My Walletのページ</Link>
              で見られます
            </Text>
          </VStack>
        )}
      </VStack>
      <div className={`${styles.capsule} ${isPlaying ? styles.playing : ''}`}>
        <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
        {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
      </div>
    </div>
  );
};
