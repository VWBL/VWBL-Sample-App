'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { NFTListComponent } from './nft-list';
import { MEDIA_TYPE } from '../../../utils';
import { VwblContainer } from '../../../container';

export const NFTList = () => {
  const [nfts, setNfts] = useState<ExtendedMetadeta[]>([]);
  const [sortedNFTs, setSortedNFTs] = useState<ExtendedMetadeta[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(MEDIA_TYPE.All);
  const { vwblViewer, initVWBLViewer } = VwblContainer.useContainer();

  const loadNFTs = useCallback(async () => {
    const items = await vwblViewer?.listMetadataFormMultiContracts([
      '0xfCD7669A5AAb4D85772cC8791331182bf0f1E2F2',
      '0x42Dd5Ef4773aA438A668f02C5E26f0F31a5e994C',
      '0x268d2A3697DEcE5ed8Fd9972935635e4aa1201c1',
    ]);
    if (!items) return;
    setNfts(items.filter((v) => v).reverse() as ExtendedMetadeta[]);
  }, []);

  const sortNFTsByMedia = (nfts: ExtendedMetadeta[], sortType: string) => {
    // MediaType: All
    if (sortType === MEDIA_TYPE.All) {
      return nfts;
    }
    // MediaType: Other
    if (sortType === MEDIA_TYPE.Other) {
      return nfts.filter((nft) => sortType.includes(nft.mimeType.split('/')[0]));
    }
    // MediaType: Image, Sound, Movie
    return nfts.filter((nft) => sortType === nft.mimeType.split('/')[0]);
  };

  const changeSortType = (newType: string) => setSortType(newType);

  useEffect(() => {
    setSortedNFTs(sortNFTsByMedia(nfts, sortType));
  }, [sortType, nfts]);

  useEffect(() => {
    const initializeViewer = async () => {
      if (!vwblViewer) {
        try {
          await initVWBLViewer();
        } catch (initError) {
          setIsOpenModal(true);
          console.log('Error during initialization:', initError);
          return;
        }
      }
      await loadNFTs();
    };

    initializeViewer();
  }, [vwblViewer, initVWBLViewer, loadNFTs]);
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
