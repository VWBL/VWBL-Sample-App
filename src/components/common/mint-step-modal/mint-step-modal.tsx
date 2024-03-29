import { Modal, ModalContent, ModalHeader, ModalOverlay, Text, Box, Button, CircularProgress, Flex, Center } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { StepStatus } from 'vwbl-sdk';
import Link from 'next/link';
import { memo } from 'react';

export type Props = {
  isOpen: boolean;
  signature?: string;
  mintStep: StepStatus[];
  onClose: () => void;
  handleCancelClick: () => void;
  handleMintStart: () => void;
};

export type MintStepProps = {
  mintStep: StepStatus[];
  signature?: string;
  handleMintStart: () => void;
};

export const MintStepModal: React.FC<Props> = memo(({ isOpen, signature, mintStep, onClose, handleCancelClick, handleMintStart }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={5} mx={'a'}>
        <ModalHeader fontSize={'2xl'}>Follow the steps</ModalHeader>

        <Box my={3}>
          <Flex alignItems={'center'} mb={6} px={6}>
            <Box mr={8}>
              {mintStep.length < 1 || signature ? (
                <CheckIcon sx={{ width: 30, height: 30 }} color={signature ? 'black' : 'gray.200'} />
              ) : (
                <CircularProgress isIndeterminate size='30px' color='black' />
              )}
            </Box>
            <Box>
              <Text fontSize='xl' as='b'>
                Sign
              </Text>
              <Text>Sign a message to start using VWBL</Text>
            </Box>
          </Flex>

          <Flex alignItems={'center'} mb={6} px={6}>
            <Box mr={8}>
              {!mintStep.includes(StepStatus.ENCRYPT_DATA) || mintStep.includes(StepStatus.UPLOAD_METADATA) ? (
                <CheckIcon sx={{ width: 30, height: 30 }} color={mintStep.includes(StepStatus.UPLOAD_METADATA) ? 'black' : 'gray.200'} />
              ) : (
                <CircularProgress isIndeterminate size='30px' color='black' />
              )}
            </Box>
            <Box>
              <Text fontSize='xl' as='b'>
                Upload
              </Text>
              <Text>Uploading of all media assets and metadata to IPFS</Text>
            </Box>
          </Flex>

          <Flex alignItems={'center'} mb={6} px={6}>
            <Box mr={8}>
              {!mintStep.includes(StepStatus.UPLOAD_METADATA) || mintStep.includes(StepStatus.MINT_TOKEN) ? (
                <CheckIcon sx={{ width: 30, height: 30 }} color={mintStep.includes(StepStatus.MINT_TOKEN) ? 'black' : 'gray.200'} />
              ) : (
                <CircularProgress isIndeterminate size='30px' color='black' />
              )}
            </Box>
            <Box>
              <Text fontSize='xl' as='b'>
                Mint
              </Text>
              <Text>Send transaction to create your NFT</Text>
            </Box>
          </Flex>

          <Flex alignItems={'center'} mb={6} px={6}>
            <Box mr={8}>
              {!mintStep.includes(StepStatus.MINT_TOKEN) || mintStep.includes(StepStatus.SET_KEY) ? (
                <CheckIcon sx={{ width: 30, height: 30 }} color={mintStep.includes(StepStatus.SET_KEY) ? 'black' : 'gray.200'} />
              ) : (
                <CircularProgress isIndeterminate size='30px' color='black' />
              )}
            </Box>
            <Box>
              <Text fontSize='xl' as='b'>
                Set key
              </Text>
              <Text>Save decryption key to VWBL Network</Text>
            </Box>
          </Flex>
          {mintStep.includes(StepStatus.SET_KEY) ? (
            <>
              <Center mt={10} mb={6}>
                <Text fontSize={'xl'} as='b'>
                  You have minted your VWBL NFT! 🎉
                </Text>
              </Center>
              <Center>
                <Link href={`/account/`} replace passHref>
                  My page
                </Link>
              </Center>
            </>
          ) : (
            <>
              <Center my={4}>
                <Button type='submit' color='white' bg='black' w={'90%'} disabled={mintStep.length > 0} onClick={handleMintStart}>
                  {mintStep.length < 1 && 'Start'}
                  {mintStep.length > 1 && 'In Progress...'}
                  {mintStep.includes(StepStatus.SET_KEY) && 'Minted'}
                </Button>
              </Center>

              <Center>
                <Button color='black' bg='white' variant='outline' onClick={handleCancelClick} w={'90%'}>
                  Cancel
                </Button>
              </Center>
            </>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
});
MintStepModal.displayName = 'MintStepModal';
