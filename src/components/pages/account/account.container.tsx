'use client';

import { useState, useEffect, useCallback } from 'react';
import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { ExtendedMetadata } from 'vwbl-sdk';
import { switchChain } from '../../../utils';
import { ethers } from 'ethers';
import axios from 'axios';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<ExtendedMetadata[]>([]);
  const [mintedNfts, setMintedNfts] = useState<ExtendedMetadata[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const { vwblViewer, initVWBLViewer, provider, connectWallet, checkNetwork } = VwblContainer.useContainer();

  const setup = useCallback(async () => {
    if (!provider) {
      await connectWallet();
      return;
    }
    const ethersProvider = new ethers.BrowserProvider(provider);
    const userAddress = await (await ethersProvider.getSigner()).getAddress();
    setWalletAddress(userAddress);

    if (!vwblViewer) {
      initVWBLViewer();
      return;
    }

    const [ownedItems, mintedItems] = await Promise.all([
      axios
        .get(`${process.env.NEXT_PUBLIC_ALCHEMY_NFT_API}/getNFTs?owner=${userAddress}`)
        .then((result) =>
          result.data.ownedNfts
            .filter((v: any) => typeof v.metadata.encrypted_data !== 'undefined')
            .map((v: any) => ({
              id: Number(v.id.tokenId),
              name: v.metadata.name,
              description: v.metadata.description,
              image: v.metadata.image,
              mimeType: v.metadata.mime_type,
              encryptLogic: v.metadata.encrypt_logic,
              address: v.contract.address,
            }))
            .reverse(),
        )
        .catch((err) => {
          setIsOpenModal(true);
          return [];
        }),
      vwblViewer
        .listMintedNFTMetadata(userAddress)
        .then((mintedItems) => mintedItems.filter((v) => v).reverse() as ExtendedMetadata[])
        .catch((err) => {
          return [];
        }),
    ]);

    setOwnedNfts(ownedItems);
    setMintedNfts(mintedItems);
  }, [provider, vwblViewer, connectWallet, initVWBLViewer]);

  useEffect(() => {
    checkNetwork(() => switchChain(provider));
  }, [checkNetwork, provider]);

  useEffect(() => {
    setup();
  }, [setup]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <AccountComponent
      ownedNfts={ownedNfts}
      mintedNfts={mintedNfts}
      walletAddress={walletAddress}
      isOpenModal={isOpenModal}
      onCloseModal={handleCloseModal}
      tabIndex={tabIndex}
      onTabChange={handleTabChange}
    />
  );
};
