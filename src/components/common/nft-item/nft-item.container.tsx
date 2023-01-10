import { NFTItemComponent } from './nft-item';
import { ExtendedMetadeta } from '../../../../VWBL-SDK/src/vwbl/metadata';
// import { ExtendedMetadeta } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadeta;
};

export const NFTItem: React.FC<Props> = ({ nft }) => {
  return <NFTItemComponent nft={nft} />;
};
