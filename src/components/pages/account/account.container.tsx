import { useState, useEffect } from 'react';

import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { ChainId, switchChain } from '../../../utils';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<ExtendedMetadeta[]>([]);
  const [mintedNfts, setMintedNfts] = useState<ExtendedMetadeta[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const { vwblViewer, initVWBLViewer, web3, connectWallet, checkNetwork } = VwblContainer.useContainer();
  const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

  useEffect(() => {
    checkNetwork(() => switchChain(properChainId));
  }, [checkNetwork]);

  useEffect(() => {
    const setup = async () => {
      if (!web3) {
        await connectWallet();
        return;
      }
      const userAddress = (await web3.eth.getAccounts())[0];
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
  }, [vwblViewer, web3]);

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
