import { ChangeEvent } from 'react';
import { FormControl, FormErrorMessage, Container, Input, Checkbox, Heading, Text, Box, useToast } from '@chakra-ui/react';
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';

import { Link } from '@chakra-ui/next-js';
import { FormInputs } from './new-nft.container';
import { FilePreviewer } from '../../common/file-previewer';
import { MintStepModal } from '../../common/mint-step-modal';
import { Button } from '../../common/button';
import { MAX_FILE_SIZE } from '../../../utils';
import { StepStatus } from 'vwbl-sdk';
import { CustomLabel } from './components/custom-label';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  onSubmit: (data: FormInputs) => Promise<void>;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => void;
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
  isWalletConnected: boolean;
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
  isWalletConnected,
}) => {
  const toast = useToast();

  const handleCreateItem = () => {
    if (!isWalletConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to create an NFT.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    toggleModal();
  };

  return (
    <Container maxW='container.md' my={20} centerContent>
      <Box w={'100%'} maxW={480}>
        <Heading as='h1' mb={12} fontSize='3xl'>
          Create New Item
          <Box as='small' color='red' pl={3}>
            for Free
          </Box>
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl isInvalid={!!errors.asset} mb={12}>
            <CustomLabel title='Asset' htmlFor='asset' isRequired />
            <Text color='gray.600' mb={4}>
              Only those with NFT will be able to view it.
            </Text>
            <FilePreviewer
              url={fileUrl}
              onChange={onChangeFile}
              onClear={onClearFile}
              inputId='asset'
              mimeType={mimeType}
              labelText={'Image, Video, Audio, or PDF'}
              opt={{
                ...register('asset', {
                  required: 'Asset is required',
                  validate: {
                    maxFileSize: (f) => !f[0] || f[0].size < MAX_FILE_SIZE || 'Uploaded file is too large',
                  },
                }),
              }}
            />
            <FormErrorMessage>{errors.asset && errors.asset.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.thumbnail} mb={12}>
            <CustomLabel title='Thumbnail' htmlFor='thumbnail' isRequired />
            <Text color='gray.600' mb={4}>
              Anyone can see it. Imagine it as a preview.
            </Text>
            <FilePreviewer
              url={thumbnailUrl}
              onClear={onClearThumbnail}
              inputId='thumbnail'
              onChange={onChangeThumbnail}
              opt={{
                ...register('thumbnail', {
                  required: 'Thumbnail is required',
                  validate: {
                    maxFileSize: (f) => !f[0] || f[0].size < MAX_FILE_SIZE || 'Uploaded file is too large',
                  },
                }),
              }}
              acceptType='.jpeg,.jpg,.png,.gif'
              labelText={'Image'}
            />
            <FormErrorMessage>{errors.thumbnail && errors.thumbnail.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title} mb={12}>
            <CustomLabel title='Title' htmlFor='title' isRequired />
            <Input
              id='title'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder='Enter a title of your item'
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 4, message: 'Minimum length should be 4 characters' },
              })}
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description} mb={12}>
            <CustomLabel title='Description' htmlFor='description' isRequired />
            <Input
              id='description'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder='Enter a description of your item'
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 4, message: 'Minimum length should be 4 characters' },
              })}
            />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>
          <Text mb={8}>With preserved line-breaks</Text>

          <FormControl mb={4}>
            <Checkbox size='md' colorScheme='blackAlpha' isChecked={isChecked} onChange={onChangeCheckbox} id='terms-checkbox'>
              <Text fontSize='sm'>I agree to the terms of service</Text>
            </Checkbox>
          </FormControl>
          <Link
            fontSize='sm'
            color='blue.600'
            href='https://ango-ya.notion.site/5632a448348b4722b2256e016dcc0cb4'
            isExternal
            mb={8}
            display='inline-block'
          >
            Terms of Service
            <ExternalLinkIcon mx='2px' />
          </Link>
          <Button
            text={isWalletConnected ? 'Create Item for Free' : 'Connect Wallet to Create NFT'}
            onClick={handleCreateItem}
            isLoading={isLoading}
            loadingText='Creating Your NFT'
            width='100%'
            fontWeight='bold'
            disabled={!isChecked || !isWalletConnected}
            mt={8}
          />
          <Text mt={6}>
            Creating a new item may take a few minutes.
            <br />
            Please do not move to another page while loading.
          </Text>
          <MintStepModal
            mintStep={mintStep}
            isOpen={isModalOpen}
            onMintClick={handleSubmit(onSubmit)}
            onClose={toggleModal}
            handleCancelClick={toggleModal}
          />
        </form>
      </Box>
    </Container>
  );
};
