import { Container, Image, Text } from '@chakra-ui/react';

export const CustomLoading = () => {
  return (
    <Container justifyContent='center' h='85vh' centerContent>
      <Image src='/logo_blink.gif' alt='' w={180} h={180} />
      <Text fontWeight={'bold'} fontSize={'lg'}>
        Now Loading ...
      </Text>
    </Container>
  );
};
