import { useState, useEffect, useCallback } from 'react';
import { Metadata } from 'vwbl-sdk';
import { NFTListComponent } from './nft-list';
import { fetchAllTokens, MEDIA_TYPE } from '../../../utils';

export const NFTList = () => {
  const [nfts, setNfts] = useState<(Metadata | undefined)[]>([]);
  const [sortedNFTs, setSortedNFTs] = useState<(Metadata | undefined)[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(MEDIA_TYPE.All);

  const loadNFTs = useCallback(async () => {
    const items = await fetchAllTokens();
    if (!items) return;
    setNfts(items.reverse());
  }, []);

  const sortNFTsByMedia = (nfts: (Metadata | undefined)[], sortType: string) => {
    // MediaType: All
    if (sortType === MEDIA_TYPE.All) {
      return nfts;
    }
    // MediaType: Other
    if (sortType === MEDIA_TYPE.Other) {
      return nfts.filter((nft) => nft && sortType.includes(nft.mimeType.split('/')[0]));
    }
    // MediaType: Image, Sound, Movie
    return nfts.filter((nft) => nft && sortType === nft.mimeType.split('/')[0]);
  };

  const changeSortType = (newType: string) => setSortType(newType);

  useEffect(() => {
    setSortedNFTs(sortNFTsByMedia(nfts, sortType));
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
      sortType={sortType}
      changeSortType={changeSortType}
    />
  );
};
