import { Heading, Box, Container, Text, Link } from '@chakra-ui/react';
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
          「Music NFT を無料で受け取る」をクリックすると、
          <br />
          NFT受取サイトへ移動します。
          <br />
          受取にはMetaMask（メタマスク）のインストールが必要です。
          <br />
          ※ これも本当のことです。
          <br />
          <br />
          <Link
            color='blue.600'
            href='https://support.metamask.io/hc/ja/articles/360015489531-MetaMask%E3%82%92%E5%A7%8B%E3%82%81%E3%82%8B'
            isExternal
          >
            MetaMaskとは？
          </Link>
        </Text>
      </Box>
    </Container>
  );
};
