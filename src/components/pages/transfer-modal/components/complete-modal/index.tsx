import { HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { BsCheckLg } from 'react-icons/bs';
import { Button } from '../../../../common/button';

type CompleteModalProps = {
  isComplete: boolean;
  onRefresh: () => void;
};

export const CompleteModal: React.FC<CompleteModalProps> = ({ isComplete, onRefresh }) => {
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

CompleteModal.displayName = 'CompleteModal';
