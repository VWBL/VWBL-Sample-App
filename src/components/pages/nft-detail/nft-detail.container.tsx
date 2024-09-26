'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NftDetailComponent } from './nft-detail';
import { VwblContainer } from '../../../container';
import { switchChain } from '../../../utils/helper';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { vwbl, vwblViewer, userAddress, provider, initVwbl, updateVwbl, initVWBLViewer, checkNetwork } = VwblContainer.useContainer();

  const { contractAddress, tokenId } = useMemo(() => {
    const parts = pathname?.split('/').filter(Boolean);
    if (parts && parts.length >= 3 && parts[0] === 'assets') {
      return {
        contractAddress: parts[1],
        tokenId: parts[2],
      };
    }
    return { contractAddress: null, tokenId: null };
  }, [pathname]);

  useEffect(() => {
    const initialize = async () => {
      if (!provider) return;
      if (!vwbl) {
        await initVwbl();
      } else if (!vwblViewer) {
        await initVWBLViewer();
      } else {
        setIsInitialized(true); // 初期化完了
      }
    };

    initialize();
  }, [provider, vwbl, vwblViewer, initVwbl, initVWBLViewer]);

  const loadNFTByTokenId = useCallback(async () => {
    if (!contractAddress || !tokenId) {
      console.error('Error: Invalid path. Expected format: ./assets/contractAddress/tokenId');
      setIsOpenNotificationModal(true);
      return;
    }

    if (!vwbl || !vwblViewer) {
      return;
    }

    try {
      await Promise.all([checkNetwork(() => switchChain(provider)), vwbl.sign()]);

      const [metadata, owner] = await Promise.all([
        vwbl.extractMetadata(parseInt(tokenId), contractAddress),
        vwblViewer.getNFTOwner(contractAddress, parseInt(tokenId)),
      ]);

      if (!metadata) {
        throw new Error('Something went wrong, please try again.');
      }

      setLoadedNft({ ...metadata, owner });
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes('User denied')) {
        router.back();
      } else if (err instanceof Error && err.message === NoMetadata) {
        handleNoMetadataError();
      } else {
        setIsOpenNotificationModal(true);
      }
    }
  }, [vwbl, vwblViewer, provider, checkNetwork, router, contractAddress, tokenId]);

  const handleNoMetadataError = useCallback(async () => {
    if (!contractAddress || !tokenId || !provider) return;

    const id = parseInt(tokenId);
    const nftWithoutMetadata: FetchedNFT = {
      id,
      name: `#${tokenId}`,
      description: '',
      image: '/noimage.jpg',
      mimeType: '',
      encryptLogic: 'base64',
      owner: '',
    };

    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const signerAddress = await signer.getAddress();

      const isOwner = await isOwnerOf(ethersProvider, id);

      setLoadedNft(isOwner ? { ...nftWithoutMetadata, owner: signerAddress } : nftWithoutMetadata);
    } catch (err) {
      console.error('Error handling no metadata:', err);
      setLoadedNft(nftWithoutMetadata);
    }
  }, [contractAddress, tokenId, provider]);

  const onCloseNotificationModal = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (userAddress) setWalletAddress(userAddress);
  }, [userAddress]);

  useEffect(() => {
    if (isInitialized) {
      loadNFTByTokenId();
    }
  }, [isInitialized, loadNFTByTokenId]);
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
      contractAddress={contractAddress}
      tokenId={tokenId}
    />
  );
};
