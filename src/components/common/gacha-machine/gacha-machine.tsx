import React from 'react';
import { Alert, Button, Container, Heading, Image, Spinner, Text, VStack, Link, Box, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
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
  showResultModal: boolean;
  onCloseResultModal: () => void;
};

export const GachaMachineComponent: React.FC<GachaMachineComponentProps> = ({
  currentItem,
  fetchData,
  isLoading,
  error,
  hasPlayedGacha,
  showResultModal,
  onCloseResultModal,
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
                {!hasPlayedGacha && (
                  <>
                    <Text fontSize='md' color='gray.600' fontStyle='italic'>
                      ガチャを回して景品をゲットしよう！
                    </Text>
                    <Text fontSize='sm' color='gray.500'>
                      ※ ガチャは1人1回までです。
                    </Text>
                  </>
                )}
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
          <VStack spacing={3}>
            <Button
              colorScheme='blackAlpha'
              bg='black'
              size='lg'
              color='white'
              display='flex'
              onClick={fetchData}
              isDisabled={hasPlayedGacha || isLoading || (currentItem !== null && !error)}
              isLoading={isLoading}
              loadingText='ガチャ実行中...'
              spinner={<Spinner />}
            >
              {hasPlayedGacha ? 'ガチャ完了です' : 'ガチャを回す'}
            </Button>
            {hasPlayedGacha && (
              <Link href='/account' color='blue.600' fontSize='md' fontWeight='medium'>
                → 景品はこちらから確認できます
              </Link>
            )}
          </VStack>
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
        {/* ガチャ結果モーダル */}
        <Modal isOpen={showResultModal} onClose={onCloseResultModal} size="lg" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              <Heading as='h2' size='md' color='gray.700'>
                🎉 ガチャ結果 🎉
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={6}>
                <Text fontSize='lg' color='gray.600' textAlign='center'>
                  おめでとうございます！<br />
                  以下のアイテムを獲得しました！
                </Text>
                
                <Box position="relative" display="flex" justifyContent="center">
                  <div className={`${styles.capsule} ${styles.modalCapsule}`}>
                    <div className={`${styles.lid} ${currentItem ? styles.open : ''}`}></div>
                    {currentItem && <img className={styles.item} src={currentItem} alt='ガチャアイテム' />}
                  </div>
                </Box>

                <VStack spacing={3}>
                  <Text fontSize='md' color='gray.600' textAlign='center'>
                    獲得したアイテムは<br />
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
                    onClick={onCloseResultModal}
                  >
                    My Walletで確認する
                  </Button>
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </div>
  );
};
