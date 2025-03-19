'use client';

import { FALLBACK_STRING, useDynamicParams } from 'next-static-utils';
import { NftDetail } from '../../../../components/pages/nft-detail/nft-detail.container';

export default function ClientPage() {
  const { contractAddress, tokenId } = useDynamicParams();

  if (contractAddress === FALLBACK_STRING || tokenId === FALLBACK_STRING) return null;

  console.log('Dynamic Params:', { contractAddress, tokenId });

  return <NftDetail contractAddress={contractAddress} tokenId={tokenId} />;
}
