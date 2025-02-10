import { Box, Container, Text, Image, Divider } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { Button } from '../../../../common/button';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const HowToCreate: React.FC = memo(() => {
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
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP1 Connect Wallet
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          メニューの「Connect Wallet」クリックし、Metamask Walletを接続する。
        </Text>
        <Image src='/howto_01.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP2 Create Item for Free
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={{ base: '100%', md: '60%' }}>
          メニューの「Create」をクリックしVWBL NFT作成ページを開き、デジタルコンテンツの情報を入力する。 <br />
          全て入力したらページ下部「Create Item」ボタンでVWBL NFTを発行する。 アイテムの作成には数分かかる場合があります。
        </Text>
        <Image src='/howto_02.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          STEP3 Check your wallet
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          「My Wallet」をクリックし、保有しているVWBL NFTを表示する。VWBL NFTを選択した後、「View
          Data」をクリックしNFT保有者だけみることができる画像を閲覧する。
        </Text>
        <Image src='/howto_03.gif' alt='' w={400} border='1px' />
      </Box>
      <Box display='flex' alignItems='center' flexDir='column' gap={8}>
        <Button text='Try demo' width={{ base: '100%', md: '60%' }} mt={10} onClick={() => router.push('/create')} />
        <Link
          color='blue.600'
          href='https://ango-ya.notion.site/VWBL-NFT-OpenSea-fa6e5766bf3f4a809849e682d65fec8c'
          isExternal
          w={{ base: '100%', md: '60%' }}
        >
          VWBL NFTをOpenSeaで販売するには？
          <ExternalLinkIcon mx='2px' />
        </Link>
      </Box>
    </Container>
  );
});
HowToCreate.displayName = 'HowToCreate';
