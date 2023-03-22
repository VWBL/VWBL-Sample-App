import { Modal, ModalContent, ModalHeader, ModalOverlay, Text, Box, Button, CircularProgress, Flex, Center } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';

import { MintStepProps, Props } from './types';
import { StepStatus } from 'vwbl-sdk';

export const MintStepModal: React.FC<Props> = ({ isOpen, mintStep, onClose, handleCancelClick, handleMintStart }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={5} mx={'a'}>
        {mintStep.includes(StepStatus.SET_KEY) ? (
          <>
            <ModalHeader fontSize={'2xl'}>You have minted your VWBL NFT! 🎉</ModalHeader>
            <Center>
              <Link href={`/account/`} replace>
                <Button color='white' bg='black' w={'90%'}>
                  My page
                </Button>
              </Link>
            </Center>
          </>
        ) : (
          <>
            <ModalHeader fontSize={'2xl'}>Follow the steps</ModalHeader>

            <MintStep mintStep={mintStep} handleMintStart={handleMintStart} />

            <Center>
              <Button color='black' bg='white' variant='outline' onClick={handleCancelClick} w={'90%'}>
                Cancel
              </Button>
            </Center>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const MintStep: React.FC<MintStepProps> = ({ mintStep, handleMintStart }) => {
  return (
    <Box my={3}>
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

      <Center>
        <Button type='submit' color='white' bg='black' w={'90%'} disabled={mintStep.length > 0} onClick={handleMintStart}>
          {mintStep.length < 1 && 'Start'}
          {mintStep.length > 1 && 'In Progress...'}
          {mintStep.includes(StepStatus.SET_KEY) && 'Minted'}
        </Button>
      </Center>
    </Box>
  );
};
