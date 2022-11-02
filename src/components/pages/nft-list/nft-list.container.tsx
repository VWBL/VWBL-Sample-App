import { useState, useEffect, useCallback } from 'react';

import { Metadata } from 'vwbl-sdk';
import { NFTListComponent } from './nft-list';
import { fetchAllTokens } from '../../../utils';

export const NFTList = () => {
  const [nfts, setNfts] = useState<(Metadata | undefined)[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const loadNFTs = useCallback(async () => {
    const items = await fetchAllTokens();
    if (!items) return;
    setNfts(items.reverse());
  }, []);

  useEffect(() => {
    try {
      loadNFTs();
    } catch (err) {
      setIsOpenModal(true);
      console.log(err);
    }
  }, [loadNFTs]);

  return <NFTListComponent nfts={nfts} isOpenModal={isOpenModal} onCloseModal={() => setIsOpenModal(false)} />;
};
