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
  hasPlayedGacha: boolean;
  gachaPlayCount: number;
};

export const GachaMachineComponent: React.FC<GachaMachineComponentProps> = ({
  currentItem,
  fetchData,
  isLoading,
  error,
  hasPlayedGacha,
  gachaPlayCount,
}) => {
  return (
    <div className={styles.gachaMachine}>
      <VStack px={{ base: '6', md: '10' }} py={{ base: '6', md: '10' }}>
        <Container maxW='md' centerContent p={5} gap={4}>
          <Box minH='200px' display='flex' alignItems='center' justifyContent='center'>
            {!isLoading && !error && !hasPlayedGacha && (
              <VStack spacing={2}>
                <Heading as='h2' size='lg' color='black'>
                  VWBL GACHA
                </Heading>
                <Image src='/gacha_blink.gif' alt='ガチャマシーン' w={350} h={280} objectFit='contain' />
                <Text fontSize='md' color='gray.600' fontStyle='italic'>
                  ガチャを回して景品をゲットしよう！
                </Text>
                <Text fontSize='sm' color='gray.500'>
                  ※ ガチャは1人2回までです。
                </Text>
              </VStack>
            )}
            {!isLoading && !error && hasPlayedGacha && (
              <VStack spacing={6}>
                <Heading as='h2' size='lg' color='black'>
                  🎉 ガチャ結果 🎉
                </Heading>
                <Text fontSize='lg' color='gray.600' textAlign='center'>
                  景品を獲得しました！
                </Text>
                
                <Box position="relative" display="flex" justifyContent="center">
                  <div className={`${styles.capsule} ${styles.modalCapsule}`}>
                    <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
                    {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
                  </div>
                </Box>

                <VStack spacing={3}>
                  <Text fontSize='md' color='gray.600' textAlign='center'>
                    獲得した景品は<br />
                    <Link href='/account' color='blue.600' fontWeight='bold'>
                      My Walletのページ
                    </Link>
                    で確認できます。
                  </Text>
                  
                  <Button 
                    as={Link} 
                    href='/account' 
                    colorScheme='blue' 
                    size='lg'
                    _hover={{ textDecoration: 'none' }}
                  >
                    My Walletで景品を確認する
                  </Button>
                </VStack>
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
          {gachaPlayCount < 2 && (
            <Button
              colorScheme='blackAlpha'
              bg='black'
              size='lg'
              color='white'
              display='flex'
              onClick={fetchData}
              isDisabled={isLoading || gachaPlayCount >= 2}
              isLoading={isLoading}
              loadingText='ガチャ実行中...'
              spinner={<Spinner />}
            >
              ガチャを回す
            </Button>
          )}
        </Container>

        {/* 景品リスト */}
        <Container maxW='4xl' mt={8}>
          <Heading as='h3' size='md' mb={4} color='gray.700'>
            景品一覧
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/meat.jpg' alt='景品A' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムA
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/physical-blockchain.png' alt='景品B' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムB
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/physical-blockchain-earing.png' alt='景品C' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                レアアイテムC
              </Text>
            </Box>
            <Box bg='white' p={3} borderRadius='md' boxShadow='sm' textAlign='center'>
              <Image src='/crypto-currency.jpg' alt='景品D' w='100%' h='100px' objectFit='cover' borderRadius='md' mb={2} />
              <Text fontSize='sm' fontWeight='bold'>
                暗号資産・物理ビットコイン
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
      </VStack>
    </div>
  );
};

