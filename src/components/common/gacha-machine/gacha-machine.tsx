import React from 'react';
import { Alert, Button, Container, Heading, Image, Spinner, Text, VStack, Link, Box, SimpleGrid } from '@chakra-ui/react';
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
      <VStack px={{ base: '6', md: '10' }} py={{ base: '6', md: '10' }}>
        <Container maxW='md' centerContent p={5} gap={4}>
          <Box minH='200px' display='flex' alignItems='center' justifyContent='center'>
            {!isLoading && !error && (
              <VStack spacing={2}>
                <Heading as='h2' size='lg' color='black'>
                  VWBL GACHA
                </Heading>
                <Image src='/gacha_blink.gif' alt='ガチャマシーン' w={350} h={280} objectFit='contain' />
                <Text fontSize='md' color='gray.600' fontStyle='italic'>
                  ガチャを回して景品をゲットしよう！
                </Text>
              </VStack>
            )}
            {isLoading && (
              <VStack spacing={2}>
                <Image src='/logo_blink.gif' alt='VWBL Logo' w={120} />
                <Text fontSize='md' color='gray.600' fontStyle='italic'>
                  gacha gacha...
                </Text>
              </VStack>
            )}
            {error && (
              <Alert status='error' borderRadius='md'>
                <VStack align='start' spacing={1}>
                  <Text fontSize='sm' fontWeight='bold'>
                    エラーが発生しました
                  </Text>
                  <Text fontSize='xs'>{error}</Text>
                </VStack>
              </Alert>
            )}
          </Box>
          <Button
            colorScheme='blackAlpha'
            bg='black'
            size='lg'
            color='white'
            display='flex'
            onClick={fetchData}
            isDisabled={isLoading || (currentItem !== null && !error)}
            isLoading={isLoading}
            loadingText='ガチャ実行中...'
            spinner={<Spinner />}
          >
            ガチャを回す
          </Button>
        </Container>

        {/* 景品リスト */}
        <Container maxW='4xl' mt={8}>
          <Heading as='h3' size='md' mb={4} color='gray.700'>
            景品一覧
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/thumbnail_a.jpeg' alt='景品A' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムA
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/thumbnail_b.png' alt='景品B' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムB
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/thumbnail_c.png' alt='景品C' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムC
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/noimage.jpg' alt='景品D' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                シークレット
              </Text>
            </Box>
          </SimpleGrid>
        </Container>

        {isLoading && (
          <Container mt={4} maxW='md' p={4}>
            <Text fontSize='md' color='gray.600'>
              ページ遷移せずに10秒ほどお待ち下さい。
            </Text>
          </Container>
        )}
        {fetchedData && (
          <VStack mt={10} px={{ base: 4, md: 10 }}>
            <Heading as='h2' size='md' my={4}>
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
            <Button colorScheme='blackAlpha' bg='black' size='md' mt={4} color='white' onClick={() => window.location.reload()}>
              もう一度回す
            </Button>
          </VStack>
        )}
      </VStack>
    </div>
  );
};
