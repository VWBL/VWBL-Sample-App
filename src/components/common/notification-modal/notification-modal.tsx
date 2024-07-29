import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';

type Notification = {
  title: string;
  msg: string;
};

type Props = {
  notification: Notification;
  isOpen: boolean;
  onClose: () => void;
  systemMsg?: string;
  onOkButton?: JSX.Element;
  onCancelButton?: JSX.Element;
};
export const NotificationModal: React.FC<Props> = ({ notification, isOpen, onClose, onOkButton, onCancelButton }) => {
  const texts = notification.msg.split('\n');

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={4} mx={{ base: '6', md: '8' }}>
          <ModalHeader>{notification.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {texts.map((t, i) => {
              return t ? <Text key={i}>{t}</Text> : <br />;
            })}
          </ModalBody>

          <ModalFooter>
            {onOkButton}
            {onCancelButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
