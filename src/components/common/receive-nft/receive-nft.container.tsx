import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { ReceiveNFTComponent } from './receive-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { segmentation, MAX_FILE_SIZE, BASE64_MAX_SIZE, switchChain } from '../../../utils';
import { ExtendedMetadeta } from 'vwbl-sdk';

export const sampleNFT: ExtendedMetadeta = {
  id: 1,
  name: 'Ango-ya LLC',
  description: 'Company Information',
  image: 'https://nftstorage.link/ipfs/bafybeiefochdgnrz6hgvmww35vmfegchnnf6zqh3b2xzpdqhbzjyqftv3y',
  mimeType: 'application/pdf',
  encryptLogic: 'base64',
  address: '0x9850c4682475ac6bcB9CdA91F927CCc1574781C7',
};

export const ReceiveNFT = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { vwbl, checkNetwork, provider } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    if (!provider) {
      openToast({
        title: 'Wallet Not Connected',
        status: 'error',
        message: 'Please connect your wallet in order to crete your nft.',
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

      const content = await fetch('/sample-nft-content.pdf');
      const contentFile = new File([await content.blob()], 'sample-nft-content.pdf', { type: 'application/pdf' });

      const thumbnail = await fetch('https://nftstorage.link/ipfs/bafybeiefochdgnrz6hgvmww35vmfegchnnf6zqh3b2xzpdqhbzjyqftv3y');
      const thumbnailFile = new File([await thumbnail.blob()], 'sample-nft-thumbnail.png', { type: 'image/png' });

      await vwbl.managedCreateTokenForIPFS(
        sampleNFT.name,
        sampleNFT.description,
        contentFile,
        thumbnailFile,
        0,
        'base64',
        process.env.NEXT_PUBLIC_MINT_API_ID!,
      );

      openToast({
        title: 'Successfully received',
        status: 'success',
        message: 'you have successfully received NFT',
      });
      localStorage.setItem('is_received', 'true');
      setTimeout(() => router.push('/account/'), 1000);
    } catch (err: any) {
      if (err.message && err.message.includes('User denied')) {
        openToast({
          title: 'User Denied Sign',
          status: 'error',
          message: 'In order to crete your nft, please sign',
        });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [vwbl, router]);

  return <ReceiveNFTComponent onSubmit={onSubmit} isLoading={isLoading} />;
};
