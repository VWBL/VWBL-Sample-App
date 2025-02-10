import { Box, Container, Text, Image, Divider } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { Button } from '../../../../common/button';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const HowToTransfer: React.FC = memo(() => {
  const router = useRouter();
  return (
    <Container maxW='container.lg' my={10}>
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP0 Prepare Wallet
        </Text>
        <Text fontSize='md' my={5} textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
          NFTを受け取るには、仮想通貨用のウォレットが必要です。
          <br />
          VWBL Demoでは
          <Link color='blue.600' href='https://metamask.io/download/' isExternal>
            MetaMask（メタマスク）
            <ExternalLinkIcon mx='2px' />
          </Link>
          をご利用ください。{'\n\n'}
          PCの方：Chromeブラウザ {'\n'}
          Mobileの方：Metamask app内ブラウザ {'\n'}
          でVWBL Demoを開いてください。
        </Text>
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP1 Connect Wallet
        </Text>
        <Text fontSize='md' my={5} w={{ base: '100%', md: '60%' }} textAlign='left'>
          メニューの「Connect Wallet」クリックし、メタマスクなどの仮想通貨ウォレットを接続する。
        </Text>
        <Image src='/howto_01.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP2 Check your wallet
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          「My Wallet」をクリックし、保有しているVWBL NFTを表示する。
        </Text>
        <Image src='/howto_03.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP3 Transfer
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          詳細ページに遷移した後、「Transfer」をクリックする。送信先のウォレットアドレスを入力し、送信する。
        </Text>
        <Image src='/howto_04.gif' alt='' w={400} border='1px' />
      </Box>
      <Button text='My Wallet' width={{ base: '100%', md: '60%' }} mt={10} onClick={() => router.push('/account')} />
    </Container>
  );
});

HowToTransfer.displayName = 'HowToTransfer';
