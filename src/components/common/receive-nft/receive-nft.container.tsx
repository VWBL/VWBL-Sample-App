import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { utils } from 'ethers';

import { ReceiveNFTComponent } from './receive-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { switchChain } from '../../../utils';
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

      const documentId = utils.hexlify(utils.randomBytes(32));
      const tokenId = await vwbl.nft.mintTokenForIPFS(
        process.env.NEXT_PUBLIC_NFT_META_DATA_URL!,
        vwbl.opts.vwblNetworkUrl,
        0,
        documentId,
        process.env.NEXT_PUBLIC_MINT_API_ID!,
      );

      const key = process.env.NEXT_PUBLIC_DECRYPT_KEY!;
      await vwbl.setKey(tokenId, key);

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
