import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { NftDetailComponent } from './nft-detail';
import { VwblContainer } from '../../../container';
import { getAsString, switchChain } from '../../../utils/helper';
import { FetchedNFT } from '../../types';
import { isOwnerOf } from '../../../utils';
import { ethers } from 'ethers';

const NoMetadata = 'metadata not found';

export const NftDetail = () => {
  const [loadedNft, setLoadedNft] = useState<FetchedNFT>();
  const [walletAddress, setWalletAddress] = useState('');
  const [isOpenContentDrawer, setIsOpenContentDrawer] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const router = useRouter();
  const { vwbl, vwblViewer, userAddress, provider, initVwbl, updateVwbl, initVWBLViewer, checkNetwork } = VwblContainer.useContainer();

  const loadNFTByTokenId = useCallback(async () => {
    const { contractAddress, tokenId } = router.query;
    if (!contractAddress || !tokenId) return;
    if (!vwbl) {
      if (!provider) {
        initVwbl();
      } else {
        updateVwbl(provider);
      }
      return;
    }
    if (!vwblViewer) {
      initVWBLViewer();
      return;
    }

    try {
      checkNetwork(() => switchChain(provider));

      await vwbl.sign();

      const metadata = await vwbl.extractMetadata(parseInt(getAsString(tokenId)), getAsString(contractAddress));
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
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        if (!provider || !(await isOwnerOf(ethersProvider, id))) {
          setLoadedNft(nftWithoutMetadata);
        } else {
          setLoadedNft({ ...nftWithoutMetadata, owner: await ethersProvider.getSigner().getAddress() });
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
