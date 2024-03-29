import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { ReceiveAudioNFTComponent } from './receive-audio';
import { VwblContainer, ToastContainer } from '../../../container';
import { switchChain } from '../../../utils';
import { ExtendedMetadeta } from 'vwbl-sdk';

export const sampleAudioNFT: ExtendedMetadeta = {
  id: 2,
  name: 'Ango-ya DJ Service',
  description: 'Block Chain party feat.79',
  image: 'https://nftstorage.link/ipfs/bafybeicobxejm5fflfl4jauk3fh6anqrt3laahd54ydzscbdnnao4yq6t4',
  mimeType: 'audio/mpeg',
  encryptLogic: 'base64',
  address: '0x9850c4682475ac6bcB9CdA91F927CCc1574781C7',
};

export const ReceiveAudioNFT = () => {
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

      const content = await fetch('/sample-nft-audio-content.mp3');
      const contentFile = new File([await content.blob()], 'sample-nft-audio-content.mp3', { type: 'audio/mpeg' });

      const thumbnail = await fetch('https://nftstorage.link/ipfs/bafybeicobxejm5fflfl4jauk3fh6anqrt3laahd54ydzscbdnnao4yq6t4');
      const thumbnailFile = new File([await thumbnail.blob()], 'sample-nft-audio-thumbnail.png', { type: 'image/png' });

      await vwbl.managedCreateTokenForIPFS(
        sampleAudioNFT.name,
        sampleAudioNFT.description,
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

  return <ReceiveAudioNFTComponent onSubmit={onSubmit} isLoading={isLoading} />;
};
