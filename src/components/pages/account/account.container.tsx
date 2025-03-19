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

    try {
      const query = `${process.env.NEXT_PUBLIC_ALCHEMY_NFT_API}/getNFTsForOwner?owner=${userAddress}`;
      const result = await axios.get(query);

      const ownedItems = (
        await Promise.all(
          result.data.ownedNfts.map(async (v: any) => {
            if (!(v.raw && v.raw.tokenUri)) {
              console.warn(`No tokenUri available for tokenId ${v.tokenId}`);
              return null;
            }
            let metadata;
            try {
              const tokenRes = await axios.get(v.raw.tokenUri);
              metadata = tokenRes.data;
            } catch (err) {
              console.log(err);
              return null;
            }
            if (typeof metadata.encrypted_data === 'undefined') {
              console.warn(`NFT tokenId ${v.tokenId} missing encrypted_data`, metadata);
              return null;
            }
            return {
              id: Number(v.tokenId),
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              mimeType: metadata.mime_type,
              encryptLogic: metadata.encrypt_logic,
              address: v.contract.address,
            } as ExtendedMetadata;
          })
        )
      )
        .filter((item) => item !== null)
        .reverse();

      const mintedItems = await vwblViewer
        .listMintedNFTMetadata(userAddress)
        .then((mintedItems) => mintedItems.filter((v) => v).reverse() as ExtendedMetadata[])
        .catch((err) => {
          return [];
        });

      setOwnedNfts(ownedItems);
      setMintedNfts(mintedItems);
    } catch (err) {
      setIsOpenModal(true);
    }
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
