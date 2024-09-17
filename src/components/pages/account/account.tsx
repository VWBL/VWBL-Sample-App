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
  tabIndex: number;
  onTabChange: (index: number) => void;
};

export const AccountComponent: React.FC<Props> = ({
  ownedNfts,
  mintedNfts,
  walletAddress,
  isOpenModal,
  onCloseModal,
  tabIndex,
  onTabChange,
}) => {
  const tabOptions = [
    { name: 'Owned', length: ownedNfts.length },
    { name: 'Created', length: mintedNfts.length },
  ];

  return (
    <Box>
      <NotificationModal isOpen={isOpenModal} onClose={onCloseModal} notification={notifications.load_failed} />
      <Container
        borderTop='1px solid black'
        maxW='container.lg'
        centerContent
        mt={{ base: '8', md: '20' }}
        pt={{ base: '6', md: '8' }}
        pb={{ base: '12', md: '12' }}
        px={{ base: '6', md: '10' }}
        fontSize='md'
        fontWeight='bold'
        display={'flex'}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'start', md: 'center' }}
        justifyContent={{ base: 'start', md: 'center' }}
        gap={{ base: '3', md: '6' }}
        overflowWrap='break-word'
      >
        <Text fontSize='lg'>My Wallet</Text>
        <Text overflowWrap='break-word' maxW='100%'>
          {walletAddress}
        </Text>
      </Container>

      <Tabs size='md' index={tabIndex} onChange={onTabChange} colorScheme='black' variant='line' align='center'>
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

        <TabPanels mt={10} mb={20} maxW='container.lg'>
          <TabPanel p={0}>
            <ItemList nfts={ownedNfts} />
          </TabPanel>
          <TabPanel p={0}>
            <ItemList nfts={mintedNfts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
