import { Heading, Box, Container, Text, VStack, FormControl } from '@chakra-ui/react';
import { Button } from '../../common/button';
import { NFTItem } from '../../common/nft-item';
import { ExtendedMetadeta } from 'vwbl-sdk';

type Props = {
  title: string;
  description: string[];
  nft: ExtendedMetadeta;
  contents: {
    title: string;
    description: string[];
  };
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  extraInfo?: React.ReactNode;
};

export const ReceiveNFTComponent: React.FC<Props> = ({ title, description, nft, onSubmit, isLoading }) => {
  return (
    <Container maxW='container.md' my={12} centerContent>
      <Heading as='h2' mb={5} w='100%' textAlign='center' size='lg'>
        {title}
      </Heading>
      <VStack spacing={0} align='center'>
        <Text align='center'>
          {description.map((text, i) => (
            <Box as='span' display='block' key={i} m={0}>{`${text}`}</Box>
          ))}
        </Text>
        <Box>
          <NFTItem nft={nft} disabled={true} />
        </Box>
        <FormControl w='100%'>
          <Button
            width='300px'
            text='NFT を無料で受け取る'
            isLoading={isLoading}
            loadingText='Creating Your NFT'
            fontWeight='bold'
            onClick={onSubmit}
          />
        </FormControl>
      </VStack>
    </Container>
  );
};
