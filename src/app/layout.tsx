import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import { ChakraProviders } from '../providers/chakra-provider';
import { Web3Wallet } from '../container/web3modal';
import { ToastProvider } from '../providers/toast-provider';
import { VwblProvider } from '../providers/vwbl-provider';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'VWBL Demo App',
  description: 'VWBLのコアコンセプト(持っている人だけがコンテンツを視聴できる)が体験できるデモサイトです',
  openGraph: {
    title: 'VWBL Demo App',
    description: 'VWBLのコアコンセプト(持っている人だけがコンテンツを視聴できる)が体験できるデモサイトです',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Web3Wallet>
          <ChakraProviders>
            <VwblProvider>
              <ToastProvider>
                <Header />
                {children}
                <Footer />
              </ToastProvider>
            </VwblProvider>
          </ChakraProviders>
        </Web3Wallet>
      </body>
    </html>
  );
}
