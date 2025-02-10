import { Text, VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { ExternalLinkIcon } from '@chakra-ui/icons';

export const WalletInfo: React.FC = () => {
  return (
    <VStack spacing={4}>
      <Text textAlign='center'>
        NFTを受け取るには、仮想通貨用のウォレットが必要です。
        <br />
        VWBL Demoでは
        <Link color='blue.600' href='https://metamask.io/download/' isExternal>
          MetaMask(メタマスク)
          <ExternalLinkIcon mx='2px' mb='2px' />
        </Link>
        をご利用ください。
      </Text>
      <Text textAlign='center'>
        PCの方：Chromeブラウザ
        <br />
        Mobileの方：Metamask app内ブラウザ
        <br />
        でVWBL Demoを開いてください。
      </Text>
    </VStack>
  );
};
