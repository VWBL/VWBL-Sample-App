import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ProgressSubscriber, StepStatus } from 'vwbl-sdk';
import { uploadEncryptedFileToLighthouse, uploadThumbnailToLighthouse, uploadMetadataToLighthouse } from '../../../utils/ipfsHelper';
import { NewNFTComponent } from './new-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { segmentation, MAX_FILE_SIZE, BASE64_MAX_SIZE, VALID_EXTENSIONS, switchChain } from '../../../utils';

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

  const { vwbl, checkNetwork, provider } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mintStep] = useState<StepStatus[]>([]);

  const progressSubscriber: ProgressSubscriber = {
    kickStep: (status: StepStatus) => {
      console.log('kickStep called with status:', status);
      // ここでステータスを更新する処理を追加します。
    },
    kickProgress: () => {
      console.log('Progress kicked');
      // 進行状況を更新する処理を追加します。
    },
  };

  const isReceived = typeof window !== 'undefined' ? !!localStorage.getItem('is_received') : false;
  // ProgressSubscriber を使用してプログレスを更新するラッパー関数

  useEffect(() => {
    let fileReaderForFile: FileReader;
    let fileReaderForThumbnail: FileReader;
    let isCancel = false;
    if (file) {
      fileReaderForFile = new FileReader();
      fileReaderForFile.onload = () => {
        const result = fileReaderForFile.result;
        if (result && !isCancel) {
          setFileUrl(result as string);
        }
      };
      fileReaderForFile.readAsDataURL(file);
    }
    if (thumbnail) {
      fileReaderForThumbnail = new FileReader();
      fileReaderForThumbnail.onload = () => {
        const result = fileReaderForThumbnail.result;
        if (result && !isCancel) {
          setThumbnailUrl(result as string);
        }
      };
      fileReaderForThumbnail.readAsDataURL(thumbnail);
    }
    return () => {
      isCancel = true;
      if (fileReaderForFile && fileReaderForFile.readyState === 1) {
        fileReaderForFile.abort();
      }
      if (fileReaderForThumbnail && fileReaderForThumbnail.readyState === 1) {
        fileReaderForThumbnail.abort();
      }
    };
  }, [file, thumbnail]);

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      setIsLoading(true);
      const { title, description, asset, thumbnail } = data;
      if (!provider) {
        openToast({
          title: 'Wallet Not Connected',
          status: 'error',
          message: 'Please connect your wallet in order to create your NFT.',
        });
        setIsLoading(false);
        return;
      }

      if (!vwbl) {
        setIsLoading(false);
        return;
      }

      checkNetwork(() => switchChain(provider));

      try {
        if (!title || !description || !asset || !thumbnail) {
          console.log('Something went wrong.');
          return;
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
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [vwbl, router],
  );

  const onChangeFile = useCallback((e: any) => {
    const file = e.target.files[0];
    setMimeType(file?.type);
    setFile(file);
  }, []);

  const onChangeThumbnail = useCallback((e: any) => {
    const thumbnail = e.target.files[0];
    if (!thumbnail?.type.match(VALID_EXTENSIONS.image)) {
      alert('Image mime type is not valid');
      return;
    }
    setThumbnail(thumbnail);
  }, []);

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
      isReceived={isReceived}
    />
  );
};
