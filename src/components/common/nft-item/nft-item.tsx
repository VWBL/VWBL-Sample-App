import { useColorModeValue, VStack, Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ExtendedMetadata } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadata;
  disabled?: boolean;
};

export const NFTItemComponent: React.FC<Props> = ({ nft, disabled }) => {
  return (
    <Link href={`/assets/${nft.address}/${nft.id}`} passHref>
      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        width={300}
        pt={8}
        pb={5}
        gap={6}
        style={{ pointerEvents: disabled ? 'none' : undefined }}
      >
        <Box padding={'40px 30px'} bgColor='black' minHeight={426} width='100%' display='flex' alignItems='center' justifyContent='center'>
          <Image src={nft.image} alt={`Picture of ${nft.name}`} />
        </Box>
        <VStack align='start' w='100%'>
          <Text fontSize='lg' fontWeight='bold' justifyContent='flex-start' textAlign='left' w='100%'>
            {nft.name}
          </Text>
          <Text fontSize='sm' noOfLines={3} textAlign='left'>
            {nft.description}
          </Text>
        </VStack>
      </VStack>
    </Link>
  );
};
