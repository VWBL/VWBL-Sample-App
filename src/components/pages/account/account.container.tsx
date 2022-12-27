import { useState, useEffect } from 'react';

import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { Metadata, VWBL } from 'vwbl-sdk';
import { ChainId, switchChain } from '../../../utils';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<Metadata[]>([]);
  const [mintedNfts, setMintedNfts] = useState<Metadata[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const { vwbl, updateVwbl, web3, connectWallet, checkNetwork } = VwblContainer.useContainer();
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

      if (!vwbl) {
        await updateVwbl(web3);
        return;
      }
      try {
        const ownedTokenIds = await vwbl.getOwnTokenIds();
        if (!ownedTokenIds) return;
        const ownedItems = await fetchTokens(vwbl, ownedTokenIds);
        setOwnedNfts(ownedItems.reverse());

        const mintedTokenIds = await vwbl.getTokenByMinter(userAddress);
        if (!mintedTokenIds) return;
        const mintedItems = await fetchTokens(vwbl, mintedTokenIds);
        setMintedNfts(mintedItems.reverse());
      } catch (err) {
        setIsOpenModal(true);
        console.log(err);
      }
    };
    setup();
  }, [vwbl]);

  const fetchTokens = async (vwbl: VWBL, tokenIds: number[]) => {
    const items = await Promise.all(
      tokenIds.map(async (tokenId: number) => {
        let item = await vwbl.getMetadata(tokenId);
        if (!item) {
          item = {
            id: tokenId,
            name: `#${tokenId}`,
            description: '',
            image: '/noimage.jpg',
            mimeType: '',
            encryptLogic: 'base64',
          };
        }
        return item;
      }),
    );
    return items;
  };

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
