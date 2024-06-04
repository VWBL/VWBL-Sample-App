import React from 'react';
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalBody, Spinner, Flex, Spacer } from '@chakra-ui/react';

type LoadingModalProps = {
  isOpen: boolean;
};

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent p={4} mx={6}>
        <Flex alignItems='center'>
          <ModalHeader>Processing...</ModalHeader>
          <Spacer />
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='black.500' size='lg' />
        </Flex>

        <ModalBody justifyContent='center' alignItems='center'>
          <Text>NFT発行中です。完了するまでお待ちください。</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
