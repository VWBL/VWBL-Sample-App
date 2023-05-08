import { Box, Text, Container, Image } from '@chakra-ui/react';

export const WhatVWBLComponent: React.FC = () => {
  return (
    <Container maxW='container.lg' my={16}>
      <Box w={'100%'}>
        <Text fontSize='4xl' as='b' display={'flex'} justifyContent={'center'}>
          What&apos;s VWBL demo
        </Text>
        <Text fontSize='md' as='b' mb={10} display={'flex'} justifyContent={'center'}>
          VWBL demoは{'"'}VWBL NFT{'"'}をミントできるアプリです！
          <br />
          誰でも無料で使えて、作ったNFTはopenseaなどで売ることもできるよ！
        </Text>
        <Box display={'flex'} justifyContent={'space-around'} mt={14}>
          <Image src='/what-vwbl_01.png' alt='what-vwbl_01' w={400} />
          <Image src='/what-vwbl_02.png' alt='home_01' w={400} />
        </Box>
      </Box>
    </Container>
  );
};
