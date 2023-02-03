import { useColorModeValue, VStack, Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ExtendedMetadeta } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadeta;
};

export const NFTItemComponent: React.FC<Props> = ({ nft }) => {
  return (
    <Link href={`/assets/${nft.address}/${nft.id}`}>
      <a>
        <VStack bg={useColorModeValue('white', 'gray.800')} width={300} py={8} gap={4}>
          <Box
            padding={'40px 30px'}
            bgColor='black'
            minHeight={426}
            width='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Image src={nft.image} alt={`Picture of ${nft.name}`} />
          </Box>

          <Box width='100%'>
            <Text fontSize='md' fontWeight='bold'>
              {nft.name}
            </Text>
            <Text fontSize='sm' noOfLines={3}>
              {nft.description}
            </Text>
          </Box>
        </VStack>
      </a>
    </Link>
  );
};
