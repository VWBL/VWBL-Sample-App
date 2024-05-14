import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Text, Container, Image, Link, Heading, VStack, HStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const WhatVWBLComponent: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <Container maxW='container.lg' my={28}>
      <VStack mx={{ base: '2', md: '10' }}>
        <Box maxW={{ base: '100%', md: '60%' }}>
          <Heading as='h2' size='xl' noOfLines={1}>
            {t('whatVWBL.title')}
          </Heading>

          <Text fontSize='md' mt={4} fontWeight='bold' display='center' justifyContent='center'>
            {t('whatVWBL.description.0')}
            <br />
            {t('whatVWBL.description.1')}
          </Text>
          <Link color='blue.600' href='https://ango-ya.notion.site/VWBL-NFT-OpenSea-fa6e5766bf3f4a809849e682d65fec8c' isExternal>
            {t('whatVWBL.linkText')}
            <ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
        <HStack mt={14} spacing={{ base: '2', md: '10' }}>
          <Image src='/what-vwbl_01.png' alt='' w={{ base: 40, md: 80 }} />
          <Image src='/what-vwbl_02.png' alt='' w={{ base: 40, md: 80 }} />
        </HStack>
      </VStack>
    </Container>
  );
});
WhatVWBLComponent.displayName = 'WhatVWBLComponent';
