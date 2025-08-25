import { Text, Link, VStack, HStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const WalletInfo: React.FC = () => {
  return (
    <VStack spacing={4}>
      <Text textAlign='center'>
        NFTを受け取るには、仮想通貨用のウォレットが必要です。
        <br />
      </Text>
      <VStack spacing={2}>
        <HStack spacing={4} justify="center">
          <Link color='blue.600' href='https://metamask.io/download/' isExternal>
            MetaMask(メタマスク)
            <ExternalLinkIcon mx='2px' mb='2px' />
          </Link>
          <Text>または</Text>
          <Link color='blue.600' href='https://walletconnect.com/explorer' isExternal>
            WalletConnect対応ウォレット
            <ExternalLinkIcon mx='2px' mb='2px' />
          </Link>
        </HStack>
      </VStack>
      <Text textAlign='center'>
        <strong>PCの方：</strong>Chromeブラウザ
        <br />
        <strong>Mobileの方：</strong>Metamask app内ブラウザ または WalletConnect対応アプリ
        <br />
        でVWBL Demoを開いてください。
      </Text>
    </VStack>
  );
};
