import { Modal, ModalContent, ModalHeader, ModalOverlay, Text, Box, Button, CircularProgress, Flex, Center } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { StepStatus } from 'vwbl-sdk';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={5} mx={'a'}>
        <ModalHeader fontSize={'2xl'}>{t('mintStepModal.header')}</ModalHeader>

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
                {t('mintStepModal.steps.0.title')}
              </Text>
              <Text>{t('mintStepModal.steps.0.description')}</Text>
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
                {t('mintStepModal.steps.1.title')}
              </Text>
              <Text>{t('mintStepModal.steps.1.description')}</Text>
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
                {t('mintStepModal.steps.2.title')}
              </Text>
              <Text>{t('mintStepModal.steps.2.description')}</Text>
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
                {t('mintStepModal.steps.3.title')}
              </Text>
              <Text>{t('mintStepModal.steps.3.description')}</Text>
            </Box>
          </Flex>
          {mintStep.includes(StepStatus.SET_KEY) ? (
            <>
              <Center mt={10} mb={6}>
                <Text fontSize={'xl'} as='b'>
                  {t('mintStepModal.finalMessage')}
                </Text>
              </Center>
              <Center>
                <Link href={`/account/`} replace passHref>
                  {t('mintStepModal.links.myPage')}
                </Link>
              </Center>
            </>
          ) : (
            <>
              <Center my={4}>
                <Button type='submit' color='white' bg='black' w={'90%'} disabled={mintStep.length > 0} onClick={handleMintStart}>
                  {mintStep.length < 1 && t('mintStepModal.buttons.start')}
                  {mintStep.length > 1 && t('mintStepModal.buttons.inProgress')}
                  {mintStep.includes(StepStatus.SET_KEY) && t('mintStepModal.buttons.minted')}
                </Button>
              </Center>

              <Center>
                <Button color='black' bg='white' variant='outline' onClick={handleCancelClick} w={'90%'}>
                  Cancel
                  {t('mintStepModal.buttons.Cancel')}
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
