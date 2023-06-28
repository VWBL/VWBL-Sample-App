import { NFTItemComponent } from './nft-item';
import { ExtendedMetadeta } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadeta;
  disabled?: boolean;
};

export const NFTItem: React.FC<Props> = ({ nft, disabled }) => {
  return <NFTItemComponent nft={nft} disabled={disabled} />;
};
