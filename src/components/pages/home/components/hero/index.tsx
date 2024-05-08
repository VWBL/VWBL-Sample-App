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
      <Box display={{ md: 'block' }} mx={{ base: '2', md: '10' }}>
        <Text fontSize={{ base: '5xl', md: '6xl' }} fontWeight='bold' lineHeight='1.1'>
          {t('hero.title.0')}
          {t('hero.title.1')}
        </Text>
        <Text fontSize={{ base: 'xl', md: 'xl' }} my={5} fontWeight='bold'>
          {t('hero.description.0')}
          <br />
          {t('hero.description.1')}
          <br />
          {t('hero.description.2')}
        </Text>
        <Button text={t('hero.button')} width={{ base: '100%', md: '65%' }} mt={5} onClick={() => router.push('/create')} />
      </Box>
      <Box mt={{ base: 16, md: 0 }}>
        <Text fontWeight='bold' textAlign='center'>
          {t('hero.secondaryText')}
        </Text>
        <Image src='/home_01.svg' alt='' minW={{ md: 400 }} mx='auto' />
      </Box>
    </Container>
  );
});

HeroComponent.displayName = 'HeroComponent';
