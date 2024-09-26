'use client';

import { useState, useCallback } from 'react';
import { switchChain } from '../../../utils';
import { ExtendedMetadata } from 'vwbl-sdk';
import { ToastContainer, VwblContainer } from '../../../container';
import { useRouter } from 'next/navigation';
import { ReceiveNFTComponent } from './receive-nft';

type Props = {
  nft: ExtendedMetadata;
  nftKey: {
    metadataUrl: string;
    key: string;
  };
  contents: {
    title: string;
    description: string[];
  };
  successMessage: string;
  redirectUrl: string;
};

export const ReceiveNFT: React.FC<Props> = ({ nft, nftKey, contents, successMessage, redirectUrl }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { vwbl, checkNetwork, provider } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();
  const nftReceivedKey = `nft_received_${nft.name}`;
  const isReceived = typeof window !== 'undefined' ? localStorage.getItem(nftReceivedKey) === 'true' : false;

  const mintTokenAndSetKey = async (vwbl: any, metadataUrl: string, key: string, mintApiId: string) => {
    if (!vwbl.signature) {
      throw new Error('Please sign first.');
    }
    try {
      const tokenId = await vwbl.mintTokenForIPFS(metadataUrl, 0, mintApiId);
      await vwbl.setKey(tokenId, key);
      return tokenId;
    } catch (error) {
      console.error('Error in minting token and setting key:', error);
      throw error;
    }
  };

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    if (!provider) {
      openToast({
        title: 'Wallet Not Connected',
        status: 'error',
        message: 'Please connect your wallet in order to create your NFT.',
      });
      setIsLoading(false);
      return;
    }

    if (!vwbl) {
      setIsLoading(false);
      return;
    }

    checkNetwork(() => switchChain(provider));

    try {
      await vwbl.sign();
      const metadataUrl = nftKey.metadataUrl;
      const key = nftKey.key;

      const tokenId = await mintTokenAndSetKey(vwbl, metadataUrl, key, process.env.NEXT_PUBLIC_MINT_API_ID!);
      openToast({
        title: 'Successfully received',
        status: 'success',
        message: successMessage,
      });
      localStorage.setItem(nftReceivedKey, 'true');
      setTimeout(() => router.push(redirectUrl), 1000);
    } catch (err: any) {
      if (err.message && err.message.includes('User denied')) {
        openToast({
          title: 'User Denied Sign',
          status: 'error',
          message: 'In order to create your NFT, please sign',
        });
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [vwbl, router, provider, openToast, successMessage, redirectUrl]);

  return <ReceiveNFTComponent onSubmit={onSubmit} contents={contents} isLoading={isLoading} isReceived={isReceived} nft={nft} />;
};
