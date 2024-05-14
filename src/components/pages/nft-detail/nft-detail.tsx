import { Box, Text, VStack, Image, Stack } from '@chakra-ui/react';
import { RiUserFill } from 'react-icons/ri';

import { FetchedNFT } from '../../types';
import { isExtracted } from '../../../utils';
import { ContentDrawer } from '../../common/content-drawer';
import { TransferModal } from '../transfer-modal';
import { ExtractMetadata } from 'vwbl-sdk';
import { Button } from '../../common/button';
import { CustomLoading } from '../../common/custom-loading';
import { NotificationModal } from '../../common/notification-modal';
import { useTranslation } from 'react-i18next';

type Props = {
  nft: FetchedNFT | undefined;
  walletAddress: string;
  isOpenDrawer: boolean;
  isOpenTransferModal: boolean;
  isOpenNotificationModal: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  onOpenTransferModal: () => void;
  onCloseTransferModal: () => void;
  onCloseNotificationModal: () => void;
};

export const NftDetailComponent: React.FC<Props> = ({
  nft,
  walletAddress,
  isOpenDrawer,
  isOpenTransferModal,
  isOpenNotificationModal,
  onOpenDrawer,
  onCloseDrawer,
  onOpenTransferModal,
  onCloseTransferModal,
  onCloseNotificationModal,
}) => {
  const { t } = useTranslation();

  if (!nft) {
    return (
      <>
        <CustomLoading />
        <NotificationModal
          isOpen={isOpenNotificationModal}
          onClose={onCloseNotificationModal}
          title={t('notifications.decryptFailed.title')}
          message={t('notifications.decryptFailed.message')}
        />
      </>
    );
  }

  return (
    <Stack
      minH={{ md: 'calc(100vh - 160px - 3rem)', lg: 'calc(100vh - 160px)' }}
      direction={{ base: 'column', lg: 'row' }}
      mb={{ base: 12, lg: 0 }}
    >
      <ContentDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} nft={nft} />
      <TransferModal isOpen={isOpenTransferModal} onClose={onCloseTransferModal} nft={nft as ExtractMetadata} />
      <NotificationModal
        isOpen={isOpenNotificationModal}
        onClose={onCloseNotificationModal}
        title={t('notifications.decryptFailed.title')}
        message={t('notifications.decryptFailed.message')}
      />
      <Box bg='black' padding='20px 80px' position='relative' w='100%' minH={{ base: 'calc(60vh - 160px)', lg: '100%' }}>
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          w='80%'
          h='80%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Image src={nft.image} alt='picture of thumbnail' maxW='100%' maxH='100%' />
        </Box>
      </Box>
      <Box paddingX='40px' w={{ base: '100%', lg: '30vw' }}>
        <VStack justifyContent={{ base: 'center', lg: 'space-between' }} minH={{ base: 'calc(40vh - 3rem)', lg: '100%' }}>
          <Box py={6} w='100%'>
            <Text fontSize='4xl' fontWeight='bold'>
              {nft.name}
            </Text>
            <Text fontSize='md' mt={6}>
              {nft.description}
            </Text>
            <Box display='flex' alignItems='center' color={'gray.500'} mt={6}>
              <RiUserFill size={40} />
              <Box fontSize='xs' alignItems='start' ml={2} w='80%'>
                <Text color='black'>{nft.owner}</Text>
                <Text>Owner</Text>
              </Box>
            </Box>
          </Box>

          {nft.owner === walletAddress ? (
            <Box borderTop='1px solid black' w='100%' pb={{ lg: 6 }}>
              <Button text='View Data' fontWeight='bold' width='100%' mt={6} onClick={onOpenDrawer} />
              <Button text='Transfer' fontWeight='bold' width='100%' mt={4} onClick={onOpenTransferModal} isReversed />
            </Box>
          ) : isExtracted(nft) ? (
            <Box borderTop='1px solid black' w='100%' pb={{ lg: 6 }}>
              <Button text='View Data' fontWeight='bold' width='100%' mt={6} onClick={onOpenDrawer} />
            </Box>
          ) : null}
        </VStack>
      </Box>
    </Stack>
  );
};
