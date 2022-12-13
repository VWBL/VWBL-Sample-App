import { Box, Wrap, WrapItem, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Metadata } from 'vwbl-sdk';
import { MEDIA_TYPE } from '../../../utils';

import { NFTItem } from '../nft-item';
import { SortMenu } from '../sort-menu';
import { style } from './item-list.style';

type Props = {
  nfts: (Metadata | undefined)[];
};

export const ItemList: React.FC<Props> = ({ nfts }) => {
  const [sortType, setSortType] = useState<string>('all');
  return (
    <Box>
      <Box display='flex' justifyContent='right' m='auto' w={useBreakpointValue(['315px', '90vw', '630px', '960px'])}>
        <SortMenu state={sortType} changeState={setSortType} selectOptions={MEDIA_TYPE} />
      </Box>
      <Wrap spacing={4} justify='center' sx={style.wrapper}>
        {nfts.map((nft) => {
          if (nft && sortType === MEDIA_TYPE.All) {
            return (
              <WrapItem key={nft.id} my={2} style={style.wrapItem}>
                <NFTItem nft={nft} />
              </WrapItem>
            );
          }
          if (nft && sortType === nft.mimeType.split('/')[0]) {
            return (
              <WrapItem key={nft.id} my={2} style={style.wrapItem}>
                <NFTItem nft={nft} />
              </WrapItem>
            );
          }
        })}
      </Wrap>
    </Box>
  );
};
