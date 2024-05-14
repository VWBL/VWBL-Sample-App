import { ChangeEvent } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Container, Input, Checkbox, Heading, Text, Box, Link, VStack } from '@chakra-ui/react';
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInputs } from './new-nft.container';
import { FilePreviewer } from '../../common/file-previewer';
import { MintStepModal } from '../../common/mint-step-modal';
import { Button } from '../../common/button';
import { MAX_FILE_SIZE } from '../../../utils';
import { StepStatus } from 'vwbl-sdk';
import { ReceiveNFT } from '../../common/receive-nft';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  onSubmit: (data: FormInputs) => Promise<void>;
  onChangeFile: (e: ChangeEvent<{ value: unknown }>) => void;
  onChangeThumbnail: (e: ChangeEvent<{ value: unknown }>) => void;
  onClearFile: () => void;
  onClearThumbnail: () => void;
  fileUrl: string;
  thumbnailUrl: string;
  mimeType: string;
  isLoading: boolean;
  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  errors: FieldErrors<FormInputs>;
  isChecked: boolean;
  onChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mintStep: StepStatus[];
  isModalOpen: boolean;
  toggleModal: () => void;
  isReceived: boolean;
};

type LabelProps = {
  title: string;
  htmlFor: string;
  isRequired: boolean;
};

const CustomLabel: React.FC<LabelProps> = ({ title, htmlFor, isRequired }) => {
  return (
    <FormLabel display='flex' h={6} mb={4} htmlFor={htmlFor}>
      <Heading as='h3' size='md' mr={6}>
        {title} {isRequired ? '*' : '(Optional)'}
      </Heading>
    </FormLabel>
  );
};

export const NewNFTComponent: React.FC<Props> = ({
  onSubmit,
  onChangeFile,
  onClearFile,
  onChangeThumbnail,
  onClearThumbnail,
  fileUrl,
  thumbnailUrl,
  mimeType,
  isLoading,
  register,
  handleSubmit,
  errors,
  isChecked,
  onChangeCheckbox,
  mintStep,
  isModalOpen,
  toggleModal,
  isReceived,
}) => {
  const { t } = useTranslation();

  return (
    <Container maxW='container.md' my={20} centerContent>
      {isReceived || <ReceiveNFT />}

      <Box w={'100%'} maxW={480}>
        <Heading as='h2' fontSize={32} mb={20}>
          {t('newNFT.createNewItem')}
          <Box as='small' color='red' pl={3}>
            {t('newNFT.forFree')}
          </Box>
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.asset}>
            <CustomLabel title={t('newNFT.assetLabel')} htmlFor='asset' isRequired />
            <Text color='gray.600' mb={8}>
              {t('newNFT.assetDescription')}
            </Text>
            <FilePreviewer
              url={fileUrl}
              onChange={onChangeFile}
              onClear={onClearFile}
              inputId='asset'
              mimeType={mimeType}
              labelText={t('newNFT.imageVideoAudioPDF')}
              opt={{
                ...register('asset', {
                  required: t('newNFT.assetRequired'),
                  validate: {
                    maxFileSize: (f) => f[0].size < MAX_FILE_SIZE || t('newNFT.fileTooLarge'),
                  },
                }),
              }}
            />
            <FormErrorMessage>{errors.asset && errors.asset.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={12} isInvalid={!!errors.thumbnail}>
            <CustomLabel title={t('newNFT.thumbnailLabel')} htmlFor='thumbnail' isRequired />
            <Text color='gray.600' mb={8}>
              {t('newNFT.thumbnailDescription')}
            </Text>
            <FilePreviewer
              url={thumbnailUrl}
              onClear={onClearThumbnail}
              inputId='thumbnail'
              onChange={onChangeThumbnail}
              opt={{
                ...register('thumbnail', {
                  required: t('newNFT.thumbnailRequired'),
                  validate: {
                    maxFileSize: (f) => f[0].size < MAX_FILE_SIZE || t('newNFT.fileTooLarge'),
                  },
                }),
              }}
              acceptType='.jpeg,.jpg,.png,.gif'
              labelText={t('newNFT.image')}
            />

            <FormErrorMessage>{errors.thumbnail && errors.thumbnail.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title} mt={12}>
            <CustomLabel title={t('newNFT.titleLabel')} htmlFor='title' isRequired />
            <Input
              id='title'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder={t('newNFT.titlePlaceholder')}
              {...register('title', {
                required: t('newNFT.titleRequired'),
                minLength: { value: 4, message: t('newNFT.minLengthTitle') },
              })}
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description} mt={12}>
            <CustomLabel title={t('newNFT.descriptionLabel')} htmlFor='description' isRequired />
            <Input
              id='description'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder={t('newNFT.descriptionPlaceholder')}
              {...register('description', {
                required: t('newNFT.descriptionRequired'),
                minLength: { value: 4, message: t('newNFT.minLengthDescription') },
              })}
            />

            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>
          <Text mt={4}>{t('newNFT.withPreservedLineBreaks')}</Text>
          <VStack align='left' mt={20}>
            <Link color='blue.600' href='https://ango-ya.notion.site/5632a448348b4722b2256e016dcc0cb4' isExternal>
              {t('newNFT.termsOfService')}
              <ExternalLinkIcon mx='2px' mb='2px' />
            </Link>
            <Checkbox colorScheme='blackAlpha' isChecked={isChecked} onChange={onChangeCheckbox}>
              {t('newNFT.Agreetothe')}
            </Checkbox>
          </VStack>
          <Button
            text={t('newNFT.createItemForFree')}
            onClick={toggleModal}
            isLoading={isLoading}
            loadingText='Creating Your NFT'
            width='100%'
            fontWeight='bold'
            disalbed={!isChecked}
            mt={8}
          />
          <Text mt={6}>
            {t('newNFT.loadingInstructions.0')}
            <br />
            {t('newNFT.loadingInstructions.1')}
            <br />
          </Text>
          <MintStepModal
            mintStep={mintStep}
            isOpen={isModalOpen}
            onMintClick={handleSubmit(onSubmit)}
            onClose={() => console.log('click cancel')}
            handleCancelClick={toggleModal}
          />
        </form>
      </Box>
    </Container>
  );
};
