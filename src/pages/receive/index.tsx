import { useCallback, useState } from 'react';

import { ReceiveAudio } from '../../components/common/receive-nft/receive-audio';
import { ReceivePdf } from '../../components/common/receive-nft';
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

type Props = {
  isReceived: boolean;
};

export const ReceivePage: React.FC<Props> = ({}) => {
  const tabOptions = [ { name: 'Music' },{ name: 'PDF' }];
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

const Page: NextPage = () => {
  return <ReceivePage isReceived={false} />;
};

export default Page;
