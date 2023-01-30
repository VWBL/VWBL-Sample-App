import { useState } from 'react';
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, Text, Container, Badge, Stack } from '@chakra-ui/react';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { ItemList } from '../../common/item-list';
import { NotificationModal, notifications } from '../../common/notification-modal';

type Props = {
  ownedNfts: ExtendedMetadeta[];
  mintedNfts: ExtendedMetadeta[];
  walletAddress: string;
  isOpenModal: boolean;
  onCloseModal: () => void;
};

export const AccountComponent: React.FC<Props> = ({ ownedNfts, mintedNfts, walletAddress, isOpenModal, onCloseModal }) => {
  const tabOptions = [
    { name: 'Owned', length: ownedNfts.length },
    { name: 'Created', length: mintedNfts.length },
  ];
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box pt={10}>
      <NotificationModal isOpen={isOpenModal} onClose={onCloseModal} notification={notifications.load_failed} />
      <Container borderTop='1px solid black' maxW='container.lg' centerContent>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          w={{ base: 'xs', md: 'xl' }}
          spacing={6}
          py={10}
          fontWeight='bold'
          fontSize='md'
          overflowWrap='break-word'
          justifyContent='center'
        >
          <Text>My Wallet</Text>
          <Text>{walletAddress}</Text>
        </Stack>
      </Container>

      <Tabs size='md' index={tabIndex} onChange={handleTabsChange} colorScheme='black' variant='line' align='center'>
        <TabList justifyContent={'center'}>
          {tabOptions.map((tab, i) => (
            <Tab px={4} key={i} fontWeight='bold' position='relative'>
              <Text px={1}>{`${tab.name}`}</Text>
              <Badge bg='white' color='gray.400' size='md' position='absolute' top={0} right={0} p={0}>
                {tab.length}
              </Badge>
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={6} maxW='container.lg'>
          <TabPanel>
            <ItemList nfts={ownedNfts} />
          </TabPanel>

          <TabPanel>
            <ItemList nfts={mintedNfts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
