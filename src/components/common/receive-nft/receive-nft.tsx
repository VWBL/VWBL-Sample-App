import { Heading, Box } from '@chakra-ui/react';
import { sampleNFT } from './receive-nft.container';

import { Button } from '../button';
import { NFTItem } from '../nft-item';

type Props = {
  onSubmit: () => Promise<void>;
  isLoading: boolean;
};

export const ReceiveNFTComponent: React.FC<Props> = ({ onSubmit, isLoading }) => {
  return (
    <Box w={'100%'} maxW={480} mb='20'>
      <Heading as='h2' mb={12}>
        受け取ってみましょう
      </Heading>

      <Box display='flex' justifyContent='center'>
        <NFTItem nft={sampleNFT} />
      </Box>

      <form onSubmit={onSubmit}>
        <Box display='flex' justifyContent='center'>
          <Button text='Receive' type='submit' isLoading={isLoading} loadingText='Creating Your NFT' width='80%' fontWeight='bold' mt={8} />
        </Box>
      </form>
    </Box>
  );
};
