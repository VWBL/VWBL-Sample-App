import { Box, Text, Container, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Button } from '../../../../common/button';

export const HeroComponent: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxW='2xl' display={'flex'} justifyContent={'space-between'} my={16}>
      <Box w={'100%'}>
        <Text fontSize='6xl' as='b'>
          Just try the <br />
          VWBL demo.
        </Text>
        <Text fontSize='large' my={4} as='b' display={'flex'}>
          持っている人だけがコンテンツを視聴することができる
          <br />
          NFTデジタルメディアプロトコル {'"'}VWBL{'"'}。 <br />
          まずは試してみて！
        </Text>
        <Button text='Try demo' width='70%' mt={4} onClick={() => router.push('/create')} />
        <Button text='How to' width='70%' mt={4} isReversed onClick={() => router.push('/#howto')} />
      </Box>
      <Box>
        <Text fontSize='2xl' as='b' display={'flex'} justifyContent={'center'}>
          Only you can see it.
        </Text>
        <Image src='/home_01.svg' alt='home_01' minW={500} />
      </Box>
    </Container>
  );
};
