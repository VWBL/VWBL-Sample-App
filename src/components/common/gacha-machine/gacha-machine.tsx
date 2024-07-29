import React from 'react';
import { Alert, Button, Container, Heading, Image, Spinner, Text, VStack, Link } from '@chakra-ui/react';
import styles from './gacha-machine.module.css';

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
            <Heading as='h2' size='lg' my={4}>
              ガチャ実行中...
            </Heading>
            <Text fontSize='xl'>ページ遷移せずに10秒ほどお待ち下さい。</Text>
          </VStack>
        )}
        {error && (
          <Alert status='error' mt={4}>
            <VStack mt={4}>
              <Heading as='h2' size='lg' my={4}>
                ガチャがまわせませんでした。
              </Heading>
              <Text fontSize='xl'>{error}</Text>
            </VStack>
          </Alert>
        )}
        {fetchedData && (
          <VStack mt={10} px={{ base: 4, md: 10 }}>
            <Heading as='h2' size='lg' my={4}>
              ガチャの中身を見る
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }}>ガチャで獲得したアイテムは</Text>
            <Text fontSize={{ base: 'lg', md: 'xl' }}>
              <Link href='/account' color='blue.600'>
                My Walletのページ
              </Link>
              で確認できます。
            </Text>
            <div className={`${styles.capsule} ${isPlaying ? styles.playing : ''}`}>
              <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
              {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
            </div>
          </VStack>
        )}
      </VStack>
    </div>
  );
};
