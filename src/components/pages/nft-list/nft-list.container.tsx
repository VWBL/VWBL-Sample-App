import { useState, useEffect, useCallback } from 'react';
import { Metadata } from 'vwbl-sdk';
import { NFTListComponent } from './nft-list';
import { fetchAllTokens, MEDIA_TYPE } from '../../../utils';

export const NFTList = () => {
  const [nfts, setNfts] = useState<(Metadata | undefined)[]>([]);
  const [sortedNFTs, setSortedNFTs] = useState<(Metadata | undefined)[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('all');

  const loadNFTs = useCallback(async () => {
    const items = await fetchAllTokens();
    if (!items) return;
    setNfts(items.reverse());
  }, []);

  const sortNFTs = (nfts: (Metadata | undefined)[], sortType: string) => {
    if (sortType === MEDIA_TYPE.All) {
      return nfts;
    } else {
      const sortedNFTs: (Metadata | undefined)[] = [];
      for (const nft of nfts) {
        if (sortType === nft?.mimeType.split('/')[0]) sortedNFTs.push(nft);
      }
      return sortedNFTs;
    }
  };

  const changeSortType = (newType: string) => setSortType(newType);

  useEffect(() => {
    setSortedNFTs(sortNFTs(nfts, sortType));
  }, [sortType, nfts]);

  useEffect(() => {
    try {
      loadNFTs();
    } catch (err) {
      setIsOpenModal(true);
      console.log(err);
    }
  }, [loadNFTs]);

  return (
    <NFTListComponent
      nfts={sortedNFTs}
      isOpenModal={isOpenModal}
      onCloseModal={() => setIsOpenModal(false)}
      changeSortType={changeSortType}
    />
  );
};
