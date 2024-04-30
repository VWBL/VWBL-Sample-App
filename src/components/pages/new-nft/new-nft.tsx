import { ChangeEvent } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Container, Input, Checkbox, Heading, Text, Box, Link } from '@chakra-ui/react';
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';

import { FormInputs } from './new-nft.container';
import { FilePreviewer } from '../../common/file-previewer';
import { MintStepModal } from '../../common/mint-step-modal';
import { Button } from '../../common/button';
import { MAX_FILE_SIZE } from '../../../utils';
import { StepStatus } from 'vwbl-sdk';
import { ReceiveNFT } from '../../common/receive-nft';
import FileUpload from './FileUpload';
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
  const accessToken = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
  return (
    <Container maxW='container.md' my={12} centerContent>
      {isReceived || <ReceiveNFT />}
      <FileUpload accessToken={accessToken} />
      <Box w={'100%'} maxW={480}>
        <Heading as='h2' mb={12}>
          Create New Item
          <Box as='small' color='red' pl={3}>
            for Free
          </Box>
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.asset}>
            <CustomLabel title='Asset' htmlFor='asset' isRequired />
            <Text color='gray.600' mb={8}>
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
                    maxFileSize: (f) => f[0].size < MAX_FILE_SIZE || 'uploaded file is too large',
                  },
                }),
              }}
            />
            <FormErrorMessage>{errors.asset && errors.asset.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={12} isInvalid={!!errors.thumbnail}>
            <CustomLabel title='Thumbnail' htmlFor='thumbnail' isRequired />
            <Text color='gray.600' mb={8}>
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
                    maxFileSize: (f) => f[0].size < MAX_FILE_SIZE || 'uploaded file is too large',
                  },
                }),
              }}
              acceptType='.jpeg,.jpg,.png,.gif'
              labelText={'Image'}
            />

            <FormErrorMessage>{errors.thumbnail && errors.thumbnail.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title} mt={12}>
            <CustomLabel title='Title' htmlFor='title' isRequired />
            <Input
              id='title'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder='Enter a title of your item'
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description} mt={12}>
            <CustomLabel title='Description' htmlFor='description' isRequired />
            <Input
              id='description'
              focusBorderColor='gray.400'
              variant='flushed'
              placeholder='Enter a description of your item'
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />

            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>
          <Text mt={4}>With preserved line-breaks</Text>

          <Checkbox mt={8} size='lg' colorScheme='blackAlpha' isChecked={isChecked} onChange={onChangeCheckbox}>
            Agree to the&nbsp;
            <Link href='https://ango-ya.notion.site/5632a448348b4722b2256e016dcc0cb4' isExternal>
              terms of serivce
            </Link>
          </Checkbox>

          <Button
            text='Create Item for Free'
            onClick={toggleModal}
            isLoading={isLoading}
            loadingText='Creating Your NFT'
            width='100%'
            fontWeight='bold'
            disalbed={!isChecked}
            mt={8}
          />
          <Text mt={6}>
            Creating a new item may take a few minutes.
            <br />
            Please do not move to another page while loading.
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
