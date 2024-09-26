'use client';
import { useCallback, useState } from 'react';

import { Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ReceiveAudio } from './components/receive-audio';
import { ReceivePdf } from './components/receive-pdf';

export const ReceiveComponent = () => {
  const tabOptions = [{ name: 'Music' }, { name: 'PDF' }];
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <Container maxW='100%' mt={10} mb={16} centerContent>
      <Tabs w='100%' size='md' index={tabIndex} onChange={handleTabsChange} colorScheme='black' variant='line' align='center'>
        <TabList justifyContent={'center'}>
          {tabOptions.map((tab, i) => (
            <Tab px={4} key={i} fontWeight='bold' position='relative'>
              <Text px={1}>{`${tab.name}`}</Text>
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={6}>
          <TabPanel>
            <ReceiveAudio />
          </TabPanel>
          <TabPanel>
            <ReceivePdf />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
