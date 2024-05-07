import { Box, Container, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Divider, Link } from '@chakra-ui/react';
import { Button } from '../../../../common/button';
import { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export const HowToComponent: React.FC = memo(() => {
  const tabOptions = [{ name: 'Create' }, { name: 'Transfer' }];
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  const handleTabsChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <Box mx='auto' my={16}>
      <Text fontSize={{ base: '3xl', md: '4xl' }} id='howto' fontWeight='bold' textAlign='center'>
        {t('howTo.title')}
      </Text>
      <Text fontSize='md' mt={4} mb={10} px={{ base: 4, md: 0 }} fontWeight='bold' display={'flex'} justifyContent={'center'}>
        {t('howTo.description')}
      </Text>

      <Tabs size='md' index={tabIndex} onChange={handleTabsChange} colorScheme='black' variant='line' align='center'>
        <TabList justifyContent={'center'}>
          {tabOptions.map((tab, i) => (
            <Tab px={4} key={i} fontWeight='bold' position='relative'>
              <Text px={1}>{`${tab.name}`}</Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={6} maxW='container.lg'>
          <TabPanel>
            <HowToCreate />
          </TabPanel>

          <TabPanel>
            <HowToTransfer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
});

HowToComponent.displayName = 'HowToComponent';

const HowToCreate: React.FC = memo(() => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container maxW='container.lg' my={10}>
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.create.steps.0.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.0.description.0')}
          <br />
          {t('howTo.create.steps.0.description.1')}
          <Link color='blue.600' href='https://metamask.io/download/' isExternal>
            {t('howTo.create.steps.0.linkText')}
            <ExternalLinkIcon mx='2px' />
          </Link>
        </Text>
        <Text fontSize='md' textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.0.description.2')}
        </Text>
        <Text fontSize='md' textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.0.description.3')}
        </Text>
      </Box>
      <Divider mt={20} mb={10} />
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.create.steps.1.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.0.description.0')}
          メニューの「Connect Wallet」クリックし、Metamask Walletを接続する。
        </Text>
        <Image src='/howto_01.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.create.steps.2.title')}
        </Text>
        <Text fontSize='md' my={10} textAlign='left' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.2.description.0')}
          {t('howTo.create.steps.2.description.1')}
        </Text>
        <Image src='/howto_02.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.create.steps.3.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          {t('howTo.create.steps.3.description.0')}
          {t('howTo.create.steps.3.description.1')}
        </Text>
        <Image src='/howto_03.gif' alt='' w={400} border='1px' />
      </Box>
      <Box display='flex' alignItems='center' flexDir='column' gap={8}>
        <Button text={t('howTo.tryDemoButton')} width={{ base: '100%', md: '60%' }} mt={10} onClick={() => router.push('/create')} />
        <Link
          color='blue.600'
          href='https://ango-ya.notion.site/VWBL-NFT-OpenSea-fa6e5766bf3f4a809849e682d65fec8c'
          isExternal
          w={{ base: '100%', md: '60%' }}
        >
          text={t('howTo.extraLinks')}
          <ExternalLinkIcon mx='2px' />
        </Link>
      </Box>
    </Container>
  );
});
HowToCreate.displayName = 'HowToCreate';

const HowToTransfer: React.FC = memo(() => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container maxW='container.lg' my={10}>
      <Box>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.transfer.steps.0.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
          {t('howTo.transfer.steps.0.description.0')}
          <br />
          {t('howTo.transfer.steps.0.description.1')}
          <Link color='blue.600' href='https://metamask.io/download/' isExternal>
            {t('howTo.create.steps.0.linkText')}
            <ExternalLinkIcon mx='2px' />
          </Link>
          <Text fontSize='md' textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
            {t('howTo.create.steps.0.description.2')}
          </Text>
          <Text fontSize='md' textAlign='left' whiteSpace='pre-line' w={{ base: '100%', md: '60%' }}>
            {t('howTo.create.steps.0.description.3')}
          </Text>
        </Text>
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.transfer.steps.1.title')}
        </Text>
        <Text fontSize='md' my={5} w={{ base: '100%', md: '60%' }} textAlign='left'>
          {t('howTo.transfer.steps.1.description')}
        </Text>
        <Image src='/howto_01.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.transfer.steps.2.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          {t('howTo.transfer.steps.2.description')}
        </Text>
        <Image src='/howto_03.gif' alt='' w={400} border='1px' />
      </Box>
      <Divider mt={20} mb={10} />
      <Box w={'100%'}>
        <Text fontSize='large' my={4} fontWeight='bold'>
          {t('howTo.transfer.steps.3.title')}
        </Text>
        <Text fontSize='md' my={5} textAlign='left' w={{ base: '100%', md: '60%' }}>
          {t('howTo.transfer.steps.3.description')}
        </Text>
        <Image src='/howto_04.gif' alt='' w={400} border='1px' />
      </Box>
      <Button
        text={t('howTo.transfer.buttonText')}
        width={{ base: '100%', md: '60%' }}
        mt={10}
        onClick={() => router.push('/account')}
      />
    </Container>
  );
});

HowToTransfer.displayName = 'HowToTransfer';
