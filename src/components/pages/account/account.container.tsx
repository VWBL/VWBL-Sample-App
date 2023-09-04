import { useState, useEffect } from 'react';

import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { switchChain } from '../../../utils';
import { ethers } from 'ethers';
import axios from 'axios';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<ExtendedMetadeta[]>([]);
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
        const query = `${process.env.NEXT_PUBLIC_ALCHEMY_NFT_API}/getNFTs?owner=${walletAddress}`;
        const result = await axios.get(query);
        const ownedItems = result.data.ownedNfts.filter((v: any) => {
          return typeof v.metadata.encrypted_data !== "undefined"
        }).map((v: any) => {
          return {
            id: Number(v.id.tokenId),
            name: v.metadata.name,
            description: v.metadata.description,
            image: v.metadata.image,
            mimeType: v.metadata.mime_type,
            encryptLogic: v.metadata.encrypt_logic,
            address: v.contract.address,
          } as ExtendedMetadeta
        }).reverse();
        setOwnedNfts(ownedItems);
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
      walletAddress={walletAddress}
      isOpenModal={isOpenModal}
      onCloseModal={() => setIsOpenModal(false)}
    />
  );
};
