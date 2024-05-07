import { Box, Text, Container, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { Button } from '../../../../common/button';
import { useTranslation } from 'react-i18next';

export const HeroComponent: React.FC = memo(() => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container maxW='container.lg' display={{ md: 'flex' }} justifyContent={'space-between'} my={14}>
      <Box display={{ md: 'block' }}>
        <Text fontSize={{ base: '5xl', md: '6xl' }} fontWeight='bold' lineHeight='1.1'>
          {t('hero.title')}
        </Text>
        <Text fontSize={{ base: '2xl', md: 'large' }} my={4} fontWeight='bold'>
          <Box as='span' display={{ md: 'block' }}>
            {t('hero.description.0')}
          </Box>
          <Box as='span'>{t('hero.description.1')}</Box>
          <Box as='span' display={{ base: 'block' }}>
            {t('hero.description.2')}
          </Box>
        </Text>
        <Button text={t('hero.button')} width={{ base: '100%', md: '80%' }} mt={4} onClick={() => router.push('/create')} />
      </Box>
      <Box mt={{ base: 16, md: 0 }}>
        <Text fontSize='2xl' fontWeight='bold' textAlign='center'>
          {t('hero.secondaryText')}
        </Text>
        <Image src='/home_01.svg' alt='' minW={{ md: 500 }} mx='auto' />
      </Box>
    </Container>
  );
});

HeroComponent.displayName = 'HeroComponent';
