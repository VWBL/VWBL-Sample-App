'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ProgressSubscriber, StepStatus } from 'vwbl-sdk';
import { uploadEncryptedFileToLighthouse, uploadThumbnailToLighthouse, uploadMetadataToLighthouse } from '../../../utils/ipfsHelper';
import { NewNFTComponent } from './new-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { segmentation, MAX_FILE_SIZE, BASE64_MAX_SIZE, VALID_EXTENSIONS, switchChain } from '../../../utils';
import { useRouter } from 'next/navigation';

export type FormInputs = {
  asset: FileList;
  title: string;
  description: string;
  thumbnail: FileList;
};

export const NewNFT = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [mimeType, setMimeType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mintStep, setMintStep] = useState<StepStatus[]>([]);

  const { vwbl, checkNetwork, provider } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();

  const isWalletConnected = useMemo(() => !!provider, [provider]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

  const progressSubscriber: ProgressSubscriber = {
    kickStep: (status: StepStatus) => {
      setMintStep((prev) => [...prev, status]);
    },
  };

  useEffect(() => {
    let fileReaderForFile: FileReader;
    let fileReaderForThumbnail: FileReader;
    let isCancel = false;

    const readFile = (file: File, setUrl: (url: string) => void) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result && !isCancel) {
          setUrl(result as string);
        }
      };
      reader.readAsDataURL(file);
      return reader;
    };

    if (file) {
      fileReaderForFile = readFile(file, setFileUrl);
    }
    if (thumbnail) {
      fileReaderForThumbnail = readFile(thumbnail, setThumbnailUrl);
    }

    return () => {
      isCancel = true;
      [fileReaderForFile, fileReaderForThumbnail].forEach((reader) => {
        if (reader && reader.readyState === 1) {
          reader.abort();
        }
      });
    };
  }, [file, thumbnail]);

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      if (!isWalletConnected) {
        openToast({
          title: 'Wallet Not Connected',
          status: 'error',
          message: 'Please connect your wallet in order to create your NFT.',
        });
        return;
      }
      const { title, description, asset, thumbnail } = data;

      setIsLoading(true);
      if (!title || !description || !asset || !thumbnail) {
        throw new Error('Required fields are missing');
      }
      if (!vwbl) {
        setIsLoading(false);
        return;
      }

      checkNetwork(() => switchChain(provider!));

      try {
        if (!title || !description || !asset || !thumbnail) {
          throw new Error('Required fields are missing');
        }
        await vwbl.sign();

        const isLarge = asset[0].size > MAX_FILE_SIZE;
        const isBase64 = asset[0].size < BASE64_MAX_SIZE;
        const plainFile = isLarge ? segmentation(asset[0], MAX_FILE_SIZE) : asset[0];

        await vwbl.managedCreateTokenForIPFS(
          title,
          description,
          plainFile,
          thumbnail[0],
          0,
          isBase64 ? 'base64' : 'binary',
          process.env.NEXT_PUBLIC_MINT_API_ID!,
          uploadEncryptedFileToLighthouse,
          uploadThumbnailToLighthouse,
          uploadMetadataToLighthouse,
          progressSubscriber,
        );
      } catch (err: any) {
        if (err.message && err.message.includes('User denied')) {
          openToast({
            title: 'User Denied Sign',
            status: 'error',
            message: 'In order to create your NFT, please sign.',
          });
        } else {
          openToast({
            title: 'Error',
            status: 'error',
            message: err.message || 'An unexpected error occurred',
          });
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [vwbl, router, isWalletConnected, openToast, checkNetwork, provider],
  );

  const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      setFile(file);
    }
  }, []);
  const onChangeThumbnail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const thumbnail = e.target.files?.[0];
      if (thumbnail) {
        if (!thumbnail.type.match(VALID_EXTENSIONS.image)) {
          openToast({
            title: 'Invalid Image Type',
            status: 'error',
            message: 'Please upload a valid image file.',
          });
          return;
        }
        setThumbnail(thumbnail);
      }
    },
    [openToast],
  );

  const onClearFile = useCallback(() => {
    setFileUrl('');
    setFile(undefined);
  }, []);

  const onClearThumbnail = useCallback(() => {
    setThumbnailUrl('');
    setThumbnail(undefined);
  }, []);

  return (
    <NewNFTComponent
      mintStep={mintStep}
      onSubmit={onSubmit}
      onChangeFile={onChangeFile}
      onClearFile={onClearFile}
      onChangeThumbnail={onChangeThumbnail}
      onClearThumbnail={onClearThumbnail}
      fileUrl={fileUrl}
      thumbnailUrl={thumbnailUrl}
      mimeType={mimeType}
      isLoading={isLoading}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isChecked={isChecked}
      onChangeCheckbox={(e) => setIsChecked(e.target.checked)}
      isModalOpen={isModalOpen}
      toggleModal={() => setIsModalOpen((prev) => !prev)}
      isWalletConnected={isWalletConnected}
    />
  );
};
