'use client';

import { ExtendedMetadeta } from 'vwbl-sdk';
import { ReceiveNFTContainer } from './receive-nft-container.ts';

const contents = {
  title: 'Music NFT を無料で受け取る',
  description: ['暗号屋の大人気曲「ブロックチェーンパーティー」の', 'テーマソングの音源をNFTでお届けします。'],
};

export const nft: ExtendedMetadeta = {
  id: 2,
  name: 'Ango-ya DJ Service',
  description: 'Block Chain party feat.79',
  image: 'https://nftstorage.link/ipfs/bafybeicobxejm5fflfl4jauk3fh6anqrt3laahd54ydzscbdnnao4yq6t4',
  mimeType: 'audio/mpeg',
  encryptLogic: 'base64',
  address: '0x9850c4682475ac6bcB9CdA91F927CCc1574781C7',
};

export const nftKey = {
  metadataUrl: process.env.NEXT_PUBLIC_BLOCKCHAIN_PARTY_URL || 'defaultEncryptionKey',
  key: process.env.NEXT_PUBLIC_BLOCKCHAIN_PARTY_KEY || 'defaultEncryptionKey',
};

export const ReceiveAudio: React.FC = () => {
  return (
    <ReceiveNFTContainer
      nft={nft}
      nftKey={nftKey}
      contents={contents}
      fetchContentUrl='/sample-nft-audio-content.mp3'
      fetchThumbnailUrl='https://nftstorage.link/ipfs/bafybeicobxejm5fflfl4jauk3fh6anqrt3laahd54ydzscbdnnao4yq6t4'
      successMessage='You have successfully received the Music NFT'
      redirectUrl='/account/'
    />
  );
};
