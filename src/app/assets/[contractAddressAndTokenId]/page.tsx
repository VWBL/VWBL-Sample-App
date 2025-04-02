import { FALLBACK_STRING } from 'next-static-utils';
import ClientPage from './ClientPage';


export async function generateStaticParams() {
  return [{ contractAddressAndTokenId: FALLBACK_STRING }];
}

export default function Page() {
  return <ClientPage />;
}
