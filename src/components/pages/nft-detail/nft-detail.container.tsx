import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { NftDetailComponent } from './nft-detail';
import { VwblContainer } from '../../../container';
import { getAsString, switchChain } from '../../../utils/helper';
import { FetchedNFT } from '../../types';
import { ChainId, isOwnerOf } from '../../../utils';

const NoMetadata = 'metadata not found';

export const NftDetail = () => {
  const [loadedNft, setLoadedNft] = useState<FetchedNFT>();
  const [walletAddress, setWalletAddress] = useState('');
  const [isOpenContentDrawer, setIsOpenContentDrawer] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const router = useRouter();
  const { web3, vwbl, vwblViewer, userAddress, provider, initVwbl, updateVwbl, initVWBLViewer, checkNetwork } = VwblContainer.useContainer();
  const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

  const loadNFTByTokenId = useCallback(async () => {
    const { contractAddress, tokenId } = router.query;
    if (!contractAddress || !tokenId) return;
    if (!vwbl) {
      if (!web3) {
        initVwbl();
      } else {
        updateVwbl(web3);
      }
      return;
    }
    if (!vwblViewer) {
      initVWBLViewer();
      return;
    }

    try {
      checkNetwork(() => switchChain(properChainId));

      if (!vwbl.signature) await vwbl.sign();

      const metadata = await vwblViewer.extractMetadata(getAsString(contractAddress), parseInt(getAsString(tokenId)), vwbl.signature);
      if (!metadata) {
        throw new Error('Something went wrong, please try again.');
      }
      const owner = await vwblViewer.getNFTOwner(getAsString(contractAddress), parseInt(getAsString(tokenId)));
      const item = { ...metadata, owner };
      setLoadedNft(item);
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes('User denied')) {
        router.back();
      }
      if (err instanceof Error && err.message === NoMetadata) {
        const id = parseInt(getAsString(tokenId));
        const nftWithoutMetadata: FetchedNFT = {
          id,
          name: `#${tokenId}`,
          description: '',
          image: '/noimage.jpg',
          mimeType: '',
          encryptLogic: 'base64',
          owner: '',
        };
        if (!web3 || !(await isOwnerOf(web3, id))) {
          setLoadedNft(nftWithoutMetadata);
        } else {
          setLoadedNft({ ...nftWithoutMetadata, owner: await (await web3.eth.getAccounts())[0] });
        }
      } else {
        setIsOpenNotificationModal(true);
        throw err;
      }
    }
  }, [router.query, initVwbl, updateVwbl, provider, vwbl, userAddress]);

  const onCloseNotificationModal = useCallback(() => {
    router.back();
    setIsOpenNotificationModal(false);
  }, [router]);

  useEffect(() => {
    if (!userAddress) return;
    setWalletAddress(userAddress);
  }, [userAddress]);

  useEffect(() => {
    loadNFTByTokenId();
  }, [loadNFTByTokenId]);

  return (
    <NftDetailComponent
      nft={loadedNft}
      walletAddress={walletAddress}
      isOpenDrawer={isOpenContentDrawer}
      isOpenTransferModal={isOpenTransferModal}
      isOpenNotificationModal={isOpenNotificationModal}
      onOpenDrawer={() => setIsOpenContentDrawer(true)}
      onCloseDrawer={() => setIsOpenContentDrawer(false)}
      onOpenTransferModal={() => setIsOpenTransferModal(true)}
      onCloseTransferModal={() => setIsOpenTransferModal(false)}
      onCloseNotificationModal={onCloseNotificationModal}
    />
  );
};
