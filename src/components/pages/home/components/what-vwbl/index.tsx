import { ExternalLinkIcon } from '@chakra-ui/icons';

import { Box, Text, Container, Image, Link } from '@chakra-ui/react';
import { memo } from 'react';

export const WhatVWBLComponent: React.FC = memo(() => {
  return (
    <Container maxW='container.lg' my={16}>
      <Box mx='auto'>
        <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight='bold' textAlign='center'>
          What&apos;s VWBL demo
        </Text>
        <Text fontSize='md' mt={4} mb={10} fontWeight='bold' display='center' justifyContent='center'>
          VWBL demoは{'"'}VWBL NFT{'"'}をミントできるアプリです！
          <br />
          誰でも無料で使えて、作ったNFTは
          <Link color='blue.600' href='https://ango-ya.notion.site/VWBL-NFT-OpenSea-fa6e5766bf3f4a809849e682d65fec8c' isExternal>
            openseaなどで売ることもできるよ！
            <ExternalLinkIcon mx='2px' />
          </Link>
        </Text>
        <Box display={'flex'} justifyContent={'space-around'} mt={14}>
          <Image src='/what-vwbl_01.png' alt='' w={{ base: 40, md: 400 }} />
          <Image src='/what-vwbl_02.png' alt='' w={{ base: 40, md: 400 }} />
        </Box>
      </Box>
    </Container>
  );
});
WhatVWBLComponent.displayName = 'WhatVWBLComponent';
