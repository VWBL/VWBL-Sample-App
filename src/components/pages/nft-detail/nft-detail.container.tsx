'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const { vwbl, vwblViewer, userAddress, provider, initVwbl, updateVwbl, initVWBLViewer, checkNetwork } = VwblContainer.useContainer();

  const loadNFTByTokenId = useCallback(async () => {
    if (!searchParams) {
      console.error('エラー: パラメータが見つかりません。');
      return;
    }

    const contractAddress = searchParams.get('contractAddress');
    const tokenId = searchParams.get('tokenId');
    if (!contractAddress || !tokenId) return;

    if (!vwbl) {
      provider ? updateVwbl(provider) : initVwbl();
      return;
    }

    if (!vwblViewer) {
      initVWBLViewer();
      return;
    }

    try {
      // ネットワークのチェックとサインを並行実行
      await Promise.all([checkNetwork(() => switchChain(provider)), vwbl.sign()]);

      // メタデータとオーナー情報の取得を並行して実行
      const [metadata, owner] = await Promise.all([
        vwbl.extractMetadata(parseInt(getAsString(tokenId)), getAsString(contractAddress)),
        vwblViewer.getNFTOwner(getAsString(contractAddress), parseInt(getAsString(tokenId))),
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
        handleNoMetadataError(contractAddress, tokenId);
      } else {
        setIsOpenNotificationModal(true);
      }
    }
  }, [initVwbl, updateVwbl, provider, vwbl, vwblViewer, checkNetwork, router, searchParams]);

  const handleNoMetadataError = useCallback(
    async (contractAddress, tokenId) => {
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

      try {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        const signerAddress = await signer.getAddress();

        const isOwner = provider && (await isOwnerOf(ethersProvider, id));

        setLoadedNft(isOwner ? { ...nftWithoutMetadata, owner: signerAddress } : nftWithoutMetadata);
      } catch (err) {
        console.error('Error handling no metadata:', err);
        setLoadedNft(nftWithoutMetadata);
      }
    },
    [provider],
  );

  const onCloseNotificationModal = useCallback(() => {
    router.back();
    setIsOpenNotificationModal(false);
  }, [router]);

  useEffect(() => {
    if (userAddress) setWalletAddress(userAddress);
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
