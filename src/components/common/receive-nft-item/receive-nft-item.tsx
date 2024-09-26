import { Heading, Box, Container, Text, VStack } from '@chakra-ui/react';
import { Button } from '../button';
import { NFTItem } from '../nft-item';
import { ExtendedMetadata } from 'vwbl-sdk';

type Props = {
  title: string;
  description: string[];
  nft: ExtendedMetadata;
  contents: {
    title: string;
    description: string[];
  };
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  extraInfo?: React.ReactNode;
};

export const ReceiveNFTItemComponent: React.FC<Props> = ({ title, description, nft, onSubmit, isLoading }) => {
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
        <NFTItem nft={nft} disabled={true} />
        <Button
          width='300px'
          text='NFT を無料で受け取る'
          isLoading={isLoading}
          loadingText='Creating Your NFT'
          fontWeight='bold'
          onClick={onSubmit}
        />
      </VStack>
    </Container>
  );
};
