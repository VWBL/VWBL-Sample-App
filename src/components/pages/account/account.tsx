import { useState } from 'react';
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, Text, Container, Badge, Stack } from '@chakra-ui/react';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { ItemList } from '../../common/item-list';
import { NotificationModal, notifications } from '../../common/notification-modal';

type Props = {
  ownedNfts: ExtendedMetadeta[];
  walletAddress: string;
  isOpenModal: boolean;
  onCloseModal: () => void;
};

export const AccountComponent: React.FC<Props> = ({ ownedNfts, walletAddress, isOpenModal, onCloseModal }) => {
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

      <ItemList nfts={ownedNfts} />
    </Box>
  );
};
