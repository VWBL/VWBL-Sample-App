import { Wrap, WrapItem } from '@chakra-ui/react';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { NFTItem } from '../nft-item';
import { style } from './item-list.style';

type Props = {
  nfts: ExtendedMetadeta[];
};

export const ItemList: React.FC<Props> = ({ nfts }) => {
  return (
    <Wrap spacing={4} justify='center' sx={style.wrapper}>
      {nfts.map((nft) => {
        return (
          <WrapItem key={nft.id} my={2} style={style.wrapItem}>
            <NFTItem nft={nft} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
