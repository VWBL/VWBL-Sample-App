import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { ReceiveNFTComponent } from './receive-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { switchChain } from '../../../utils';
import { ExtendedMetadeta } from 'vwbl-sdk';

export const sampleNFT: ExtendedMetadeta = {
  id: 1,
  name: 'test receive nft',
  description: 'This is test sample VWBL NFT! \n you can mint your own nft',
  image: 'https://cdn.whatever.co/wp-content/uploads/2021/12/vwbl_02.jpg',
  mimeType: 'image/jpg',
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
      // await vwbl.sign();

      // await vwbl.managedCreateTokenForIPFS(
      //   sampleNFT.name,
      //   sampleNFT.description,
      //   new File([], ''),
      //   new File([], ''),
      //   0,
      //   'base64',
      //   process.env.NEXT_PUBLIC_MINT_API_ID!,
      // );
      openToast({
        title: 'Successfully received',
        status: 'success',
        message: 'you have successfully received NFT',
      });
      localStorage.setItem('is_received', 'true');
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
