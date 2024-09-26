import { HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spinner, Text } from '@chakra-ui/react';

type LoadingModalProps = {
  isLoading: boolean;
};

export const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading }) => {
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

LoadingModal.displayName = 'LoadingModal';
