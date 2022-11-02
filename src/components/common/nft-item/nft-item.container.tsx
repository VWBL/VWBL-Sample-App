import { NFTItemComponent } from './nft-item';
import { Metadata } from 'vwbl-sdk';

type Props = {
  nft: Metadata;
};

export const NFTItem: React.FC<Props> = ({ nft }) => {
  return <NFTItemComponent nft={nft} />;
};
