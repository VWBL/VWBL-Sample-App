import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

type Props = {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  systemMsg?: string;
  onOkButton?: JSX.Element;
  onCancelButton?: JSX.Element;
};
export const NotificationModal: React.FC<Props> = ({ title, message, isOpen, onClose, onOkButton, onCancelButton }) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            {onOkButton}
            {onCancelButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
