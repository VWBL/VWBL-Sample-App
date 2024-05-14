import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { ExtractMetadata } from 'vwbl-sdk';
import { FieldErrors, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';

import { FormInputs } from './transfer-modal.container';
import { FileViewer } from '../../common/file-viewer';
import { Button } from '../../common/button';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpenModal: boolean;
  isComplete: boolean;
  isLoading: boolean;
  onCloseModal: () => void;
  onRefresh: () => void;
  onSubmit: (data: FormInputs) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  nft: ExtractMetadata;
};

export const TransferModalComponent: React.FC<Props> = ({
  isOpenModal,
  isComplete,
  isLoading,
  onCloseModal,
  onRefresh,
  onSubmit,
  handleSubmit,
  register,
  errors,
  nft,
}) => {
  const LoadingModal = () => {
    const { t } = useTranslation();

    return (
      <Modal
        isOpen={isLoading}
        onClose={() => {
          return;
        }}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent p={4} mx={6}>
          <ModalHeader>{t('transferModal.loading.header')}</ModalHeader>
          <ModalBody>
            <HStack>
              <Spinner />
              <Text>{t('transferModal.loading.body')}</Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const CompleteModal = () => {
    const { t } = useTranslation();

    return (
      <Modal isOpen={isComplete} onClose={onRefresh} isCentered>
        <ModalOverlay />
        <ModalContent p={4} mx={6}>
          <ModalHeader>{t('transferModal.complete.header')}</ModalHeader>

          <ModalBody>
            <HStack mb={6}>
              <BsCheckLg />
              <Text>{t('transferModal.complete.body')}</Text>

              <Text>Your NFT was successfully transfered</Text>
            </HStack>
            <Button text={t('transferModal.complete.button')} width='100%' onClick={onRefresh} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={isOpenModal && !isLoading && !isComplete} onClose={onCloseModal} size='lg' closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW='480px' mx={6} p={0}>
          <ModalBody p={0}>
            <Box bg='black' w='100%' h='300px' position='relative'>
              <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)' w='60%'>
                <FileViewer nft={nft} />
              </Box>
            </Box>
            <Box p={10}>
              <Text fontSize='2xl' fontWeight='bold'>
                {t('transferModal.main.header')}
              </Text>
              <Stack gap={4} mt={4}>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <Text w='85px' mr={4}>
                    {t('transferModal.main.labels.title')}
                  </Text>
                  <Text fontWeight='bold'>{nft.name}</Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <Text w='85px' mr={4}>
                    {t('transferModal.main.labels.description')}
                  </Text>
                  <Text>{nft.description}</Text>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={!!errors.walletAddress}>
                    <FormLabel htmlFor='walletAddress'>
                      <Text fontWeight='bold' mb={2}>
                        {t('transferModal.main.labels.walletAddress')}
                      </Text>
                    </FormLabel>
                    <Input
                      id='walletAddress'
                      placeholder='Wallet Address'
                      focusBorderColor='gray.400'
                      {...register(t('transferModal.main.form.buttons.placeholder'), {
                        required: t('transferModal.main.form.buttons.required'),
                        pattern: {
                          value: /^0x[a-fA-F0-9]{40}$/,
                          message: t('transferModal.main.form.buttons.invalid'),
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.walletAddress && errors.walletAddress.message}</FormErrorMessage>
                  </FormControl>
                  <Button
                    text={t('transferModal.main.form.buttons.transfer')}
                    type='submit'
                    isLoading={isLoading}
                    loadingText={t('transferModal.main.form.buttons.transfering')}
                    width='100%'
                    mt={6}
                  />
                  <Button text={t('transferModal.main.form.buttons.cancel')} onClick={onCloseModal} mt={4} isReversed />
                </form>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <LoadingModal />
      <CompleteModal />
    </>
  );
};
