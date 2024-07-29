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
          <ModalHeader>Transferring</ModalHeader>
          <ModalBody>
            <HStack>
              <Spinner />
              <Text>Transferring your NFT</Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const CompleteModal = () => {
    return (
      <Modal isOpen={isComplete} onClose={onRefresh} isCentered>
        <ModalOverlay />
        <ModalContent p={4} mx={6}>
          <ModalHeader>Complete</ModalHeader>
          <ModalBody>
            <HStack mb={6}>
              <BsCheckLg />
              <Text>Your NFT was successfully transfered</Text>
            </HStack>
            <Button text='Close' width='100%' onClick={onRefresh} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <Modal isOpen={isOpenModal && !isLoading && !isComplete} onClose={onCloseModal} size='lg' closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW='480px' mx={6} p={0}>
          <ModalBody p={0}>
            <Box bg='black' w='100%' h='300px' position='relative'>
              <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)' w='100%'>
                <FileViewer nft={nft} />
              </Box>
            </Box>
            <Box px={{ base: '6', md: '10' }} py={{ base: '8', md: '10' }}>
              <Text fontSize='2xl' fontWeight='bold'>
                Transfer NFT
              </Text>
              <Stack gap={4} mt={4}>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <Text fontSize='sm' w='85px' mr={4}>
                    Title
                  </Text>
                  <Text fontSize='sm' fontWeight='bold'>
                    {nft.name}
                  </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <Text fontSize='sm' w='85px' mr={4}>
                    Description
                  </Text>
                  <Text fontSize='sm'>{nft.description}</Text>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={!!errors.walletAddress}>
                    <FormLabel htmlFor='walletAddress'>
                      <Text fontSize='sm' fontWeight='bold' mb={2}>
                        Wallet Address
                      </Text>
                    </FormLabel>
                    <Input
                      id='walletAddress'
                      placeholder='Wallet Address'
                      focusBorderColor='gray.400'
                      {...register('walletAddress', {
                        required: 'Wallet Address is required',
                        pattern: {
                          value: /^0x[a-fA-F0-9]{40}$/,
                          message: 'Invalid Wallet Address',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.walletAddress && errors.walletAddress.message}</FormErrorMessage>
                  </FormControl>
                  <Button text='Transfer' type='submit' isLoading={isLoading} loadingText='Transfering Your NFT' width='100%' mt={6} />
                  <Button text='Cancel' onClick={onCloseModal} mt={4} width='100%' isReversed />
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
