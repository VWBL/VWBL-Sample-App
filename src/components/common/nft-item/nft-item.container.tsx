import { NFTItemComponent } from './nft-item';
import { ExtendedMetadata } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadata;
  disabled?: boolean;
};

export const NFTItem: React.FC<Props> = ({ nft, disabled }) => {
  return <NFTItemComponent nft={nft} disabled={disabled} />;
};
