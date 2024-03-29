import { Heading, Box, Container, Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { sampleAudioNFT } from './receive-audio.container';

import { Button } from '../../common/button';
import { NFTItem } from '../../common/nft-item';

type Props = {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
};

export const ReceiveAudioNFTComponent: React.FC<Props> = ({ onSubmit, isLoading }) => {
  return (
    <Container maxW='container.md' my={12} centerContent>
      <Box w='100%' maxW={480} mb='20'>
        <Heading as='h2' mb={12} w='100%' textAlign='center'>
          Music NFT を無料で受け取る
        </Heading>

        <Text mt={6} textAlign='center'>
          暗号屋の大人気曲「ブロックチェーンパーティー」の
          <br />
          テーマソングの音源をNFTでお届けします。
          <br />
          MVは全員が楽しめるものですが、NFTは特別なもの。
          <br />
          VWBL（ビュアブル）を活用しており、
          <br />
          NFT所有者だけがMUSIC NFT をお楽しみいただけます。
          <br />
          ※ これは本当のことです。
          <br />
        </Text>

        <Box display='flex' justifyContent='center'>
          <NFTItem nft={sampleAudioNFT} disabled={true} />
        </Box>

        <form>
          <Box display='flex' justifyContent='center'>
            <Button
              text='Music NFT を無料で受け取る'
              isLoading={isLoading}
              loadingText='Creating Your NFT'
              width='80%'
              fontWeight='bold'
              mt={8}
              onClick={onSubmit}
            />
          </Box>
        </form>

        <Text mt={6} textAlign='center'>
          NFTを受け取るには、仮想通貨用のウォレットが必要です。
          <br />
          VWBL Demoでは
          <Link color='blue.600' href='https://metamask.io/download/' isExternal>
            MetaMask（メタマスク）
            <ExternalLinkIcon mx='2px' />
          </Link>
          をご利用ください。
          <br />
          <br />
          PCの方：Chromeブラウザ
          <br />
          Mobileの方：Metamask app内ブラウザ
          <br />
          でVWBL Demoを開いてください。
          <br />
          <br />
          <br />
          <Link color='blue.600' href='https://layer2-angoya.studio.site/' isExternal>
            特設サイトへ戻る
            <ExternalLinkIcon mx='2px' />
          </Link>
        </Text>
      </Box>
    </Container>
  );
};
