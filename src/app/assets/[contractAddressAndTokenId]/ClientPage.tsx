'use client';

import { FALLBACK_STRING, useDynamicParams } from 'next-static-utils';
import { NftDetail } from '../../../components/pages/nft-detail';

export default function ClientPage() {
  const { contractAddressAndTokenId } = useDynamicParams();

  if (!contractAddressAndTokenId || contractAddressAndTokenId === FALLBACK_STRING) {
    return null;
  }

  const [contractAddress, tokenId] = contractAddressAndTokenId.split('_');

  return <NftDetail contractAddress={contractAddress} tokenId={tokenId} />;
}
