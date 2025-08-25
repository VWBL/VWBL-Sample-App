import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';
import { MdAccountBalanceWallet } from 'react-icons/md';

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (walletType: 'metamask' | 'walletconnect') => Promise<void>;
}

export const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
}) => {
  const handleWalletSelect = async (walletType: 'metamask' | 'walletconnect') => {
    await onSelectWallet(walletType);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">ウォレットを選択</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <Text textAlign="center" color="gray.600">
              接続するウォレットを選択してください
            </Text>
            
            <Button
              w="full"
              h="60px"
              variant="outline"
              onClick={() => handleWalletSelect('metamask')}
              leftIcon={<Box w="24px" h="24px" bg="orange.500" borderRadius="md" />}
            >
              <HStack w="full" justify="space-between">
                <Text>MetaMask</Text>
                <Text fontSize="sm" color="gray.500">推奨</Text>
              </HStack>
            </Button>

            <Button
              w="full"
              h="60px"
              variant="outline"
              onClick={() => handleWalletSelect('walletconnect')}
              leftIcon={<MdAccountBalanceWallet size="24px" />}
            >
              <HStack w="full" justify="space-between">
                <Text>WalletConnect</Text>
                <Text fontSize="sm" color="gray.500">モバイル向け</Text>
              </HStack>
            </Button>

            <Text fontSize="xs" color="gray.500" textAlign="center" mt={4}>
              WalletConnectを選択すると、Trust Wallet、Rainbow、Coinbase Walletなど
              <br />
              様々なモバイルウォレットで接続できます
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};