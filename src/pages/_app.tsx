import '../styles/fonts.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/common/layout';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../../theme';
import { VwblContainer, ToastContainer } from '../container';
import '../shared/i18n';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <VwblContainer.Provider>
        <ToastContainer.Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastContainer.Provider>
      </VwblContainer.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
