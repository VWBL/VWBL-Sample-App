// @ts-ignore
import { withDynamicParams } from 'next-static-utils';
import { NftDetail } from '../../../../components/pages/nft-detail';

export const generateStaticParams = withDynamicParams();

export default function Page() {
  return <NftDetail />;
}
