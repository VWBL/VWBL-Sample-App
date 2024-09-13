import { Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { HowToTransfer } from '../howto-transfer';
import { HowToCreate } from '../howto-create';

export const HowToComponent: React.FC = memo(() => {
  const tabOptions = [{ name: 'Create' }, { name: 'Transfer' }];
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <Box mx='auto' my={16}>
      <Text fontSize={{ base: '3xl', md: '4xl' }} id='howto' fontWeight='bold' textAlign='center'>
        How to
      </Text>
      <Text fontSize='md' mt={4} mb={10} px={{ base: 4, md: 0 }} fontWeight='bold' display={'flex'} justifyContent={'center'}>
        {'"'}VWBL NFT{'"'}の発行・送信方法はこちら！早速試してみよう！
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
