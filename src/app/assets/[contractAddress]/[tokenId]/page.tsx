import { withDynamicParams } from 'next-static-utils';
import ClientPage from './ClientPage';

export const generateStaticParams = withDynamicParams();

export default function Page() {
  return <ClientPage />;
}
