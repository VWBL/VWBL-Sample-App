import { Box, Text, Container, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Button } from '../../../../common/button';

export const HeroComponent: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxW='container.lg' display={{ md: 'flex' }} justifyContent={'space-between'} my={14}>
      <Box w={'100%'}>
        <Text fontSize={{ base: '5xl', md: '6xl' }} as='b'>
          Just try the <br />
          VWBL demo.
        </Text>
        <Text fontSize={{ base: 'md', md: 'large' }} my={4} as='b' display={'flex'}>
          持っている人だけがコンテンツを視聴することができる
          <br />
          NFTデジタルメディアプロトコル {'"'}VWBL{'"'}。 <br />
          まずは試してみて！
        </Text>
        <Box display={{ base: 'flex', md: 'block' }} justifyContent={'center'} w={{ base: '90%', md: '80%' }} mx='auto'>
          <Button text='Try demo' width='100%' mt={4} />
        </Box>
        <Box display={{ base: 'flex', md: 'block' }} justifyContent={'center'} w={{ base: '90%', md: '80%' }} mx='auto'>
          <Button text='How to' width='100%' mt={4} isReversed onClick={() => router.push('/#howto')} />
        </Box>
      </Box>
      <Box mt={{ base: 16, md: 0 }}>
        <Text fontSize='2xl' as='b' display={'flex'} justifyContent={'center'}>
          Only you can see it.
        </Text>
        <Image src='/home_01.svg' alt='home_01' minW={{ md: 500 }} mx='auto' />
      </Box>
    </Container>
  );
};
