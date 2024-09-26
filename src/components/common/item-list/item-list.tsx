import { Wrap, WrapItem } from '@chakra-ui/react';
import { ExtendedMetadata } from 'vwbl-sdk';
import { NFTItem } from '../nft-item';
import { style } from './item-list.style';

type Props = {
  nfts: ExtendedMetadata[];
};

export const ItemList: React.FC<Props> = ({ nfts }) => {
  return (
    <Wrap spacing={0} justify='center' sx={style.wrapper} p={0}>
      {nfts.map((nft) => {
        return (
          <WrapItem key={nft.id} style={style.wrapItem} borderBottom={{ base: '1px', md: '4px' }} borderColor='black'>
            <NFTItem nft={nft} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
