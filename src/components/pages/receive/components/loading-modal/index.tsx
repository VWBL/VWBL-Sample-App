import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalBody, Spinner, Flex } from '@chakra-ui/react';

type LoadingModalProps = {
  isOpen: boolean;
};

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent py={6} pl={6} pr={12} mx={6}>
        <Flex alignItems='center' justifyContent='space-between' w='100%'>
          <ModalHeader>Processing...</ModalHeader>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='black.500' size='lg' />
        </Flex>

        <ModalBody>
          <Text>この処理には少し時間がかかることがあります。完了するまでお待ちください。</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
