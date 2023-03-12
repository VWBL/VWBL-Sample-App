import { useState, useEffect } from 'react';

import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { switchChain } from '../../../utils';
import { ethers } from 'ethers';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<ExtendedMetadeta[]>([]);
  const [mintedNfts, setMintedNfts] = useState<ExtendedMetadeta[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const { vwblViewer, initVWBLViewer, provider, connectWallet, checkNetwork } = VwblContainer.useContainer();

  useEffect(() => {
    checkNetwork(() => switchChain(provider));
  }, [checkNetwork, provider]);

  useEffect(() => {
    const setup = async () => {
      if (!provider) {
        await connectWallet();
        return;
      }
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      setWalletAddress(userAddress);

      if (!vwblViewer) {
        initVWBLViewer();
        return;
      }
      try {
        const ownedItems = await vwblViewer.listOwnedNFTMetadata(userAddress);
        setOwnedNfts(ownedItems.filter((v) => v).reverse() as ExtendedMetadeta[]);
        const mintedItems = await vwblViewer.listMintedNFTMetadata(userAddress);
        setMintedNfts(mintedItems.filter((v) => v).reverse() as ExtendedMetadeta[]);
      } catch (err) {
        setIsOpenModal(true);
        console.log(err);
      }
    };
    setup();
  }, [vwblViewer, provider]);

  return (
    <AccountComponent
      ownedNfts={ownedNfts}
      mintedNfts={mintedNfts}
      walletAddress={walletAddress}
      isOpenModal={isOpenModal}
      onCloseModal={() => setIsOpenModal(false)}
    />
  );
};
