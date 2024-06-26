import { Box, Text, Container, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { Button } from '../../../../common/button';

export const HeroComponent: React.FC = memo(() => {
  const router = useRouter();

  return (
    <Container maxW='container.lg' display={{ md: 'flex' }} justifyContent={'space-between'} my={14}>
      <Box display={{ md: 'block' }}>
        <Text fontSize={{ base: '5xl', md: '6xl' }} fontWeight='bold' lineHeight='1.1'>
          Just try the <br />
          VWBL NFT.
        </Text>
        <Text fontSize={{ base: '2xl', md: 'large' }} my={4} fontWeight='bold'>
          <Box as='span' display={{ md: 'block' }}>
            持っている人だけがコンテンツを視聴することができる
          </Box>
          <Box as='span'>
            NFTデジタルメディアプロトコル {'"'}VWBL{'"'}。
          </Box>
          <Box as='span' display={{ base: 'block' }}>
            まずは試してみて！
          </Box>
        </Text>
        <Button text='NFTを作成する' width={{ base: '100%', md: '80%' }} height={12} mt={8} onClick={() => router.push('/create')} />
        <Button
          text='NFTを受け取る'
          width={{ base: '100%', md: '80%' }}
          height={12}
          mt={5}
          isReversed
          onClick={() => router.push('/receive')}
        />
      </Box>
      <Box mt={{ base: 16, md: 0 }}>
        <Text fontSize='2xl' fontWeight='bold' textAlign='center'>
          Only you can see it.
        </Text>
        <Image src='/home_01.svg' alt='' minW={{ md: 500 }} mx='auto' />
      </Box>
    </Container>
  );
});

HeroComponent.displayName = 'HeroComponent';
