import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { NewNFTComponent } from './new-nft';
import { VwblContainer, ToastContainer } from '../../../container';
import { segmentation, MAX_FILE_SIZE, BASE64_MAX_SIZE, VALID_EXTENSIONS, ChainId, switchChain } from '../../../utils';
import { initBiconomy, sendMintMetaTx } from '../../../hooks/biconomy';
import { UploadToIPFS } from '../../../utils/ipfsHelper';
import { VWBLApi } from 'vwbl-sdk';

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

  const { vwbl, checkNetwork, web3 } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();
  const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });

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
      if (!web3) {
        openToast({
          title: 'Wallet Not Connected',
          status: 'error',
          message: 'Please connect your wallet in order to crete your nft.',
        });
        setIsLoading(false);
        return;
      }

      if (!vwbl) {
        setIsLoading(false);
        return;
      }

      checkNetwork(() => switchChain(properChainId));

      try {
        if (!title || !description || !asset || !thumbnail) {
          console.log('Something went wrong.');
          return;
        }
        if (!vwbl.signature) {
          await vwbl.sign();
        }

        // NOTE: MAX_FILE_SIZE > BASE64_MAX_SIZE
        const isLarge = asset[0].size > MAX_FILE_SIZE;
        const isBase64 = asset[0].size < BASE64_MAX_SIZE;
        const plainFile = isLarge ? segmentation(asset[0], MAX_FILE_SIZE) : asset[0];
        const encryptLogic = isBase64 ? 'base64' : 'binary';

        // 1. create key in frontend
        const key = vwbl.createKey();
        // 2. encrypt data
        console.log('encrypt data');
        const plainFileArray = [plainFile].flat();
        // 3. upload data
        console.log('upload data');
        const uploadToIpfs = new UploadToIPFS(process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!);
        const encryptedDataUrls = await Promise.all(
          plainFileArray.map(async (file) => {
            const encryptedContent = isBase64 ? await vwbl.encryptDataViaBase64(file, key) : await vwbl.encryptFile(file, key);
            console.log(typeof encryptedContent);
            return await uploadToIpfs.uploadEncryptedFile(encryptedContent);
          }),
        );
        const thumbnailImageUrl = await uploadToIpfs.uploadThumbnail(thumbnail[0]);
        // 4. upload metadata
        const metadataUrl = await uploadToIpfs.uploadMetadata(
          title,
          description,
          thumbnailImageUrl,
          encryptedDataUrls,
          plainFileArray[0].type,
          encryptLogic,
        );
        // 5. mint nft by meta transaction
        const { biconomy, ethersProvider, walletProvider, userAddress } = await initBiconomy();
        console.log('biconomy init:', biconomy);
        const documentId = web3.utils.randomHex(32);
        await sendMintMetaTx(biconomy, documentId, metadataUrl, userAddress, ethersProvider, walletProvider);
        // 6. set key to vwbl-network
        const keySetApi = new VWBLApi(process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!);
        const chainId = await vwbl.opts.web3.eth.getChainId();
        await keySetApi.setKey(documentId, chainId, key, vwbl.signature!);

        router.push('/');
      } catch (err: any) {
        if (err.message.includes('User denied')) {
          openToast({
            title: 'User Denied Sign',
            status: 'error',
            message: 'In order to crete your nft, please sign',
          });
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [vwbl, router],
  );

  const onChangeFile = useCallback((e) => {
    const file = e.target.files[0];
    setMimeType(file?.type);
    setFile(file);
  }, []);

  const onChangeThumbnail = useCallback((e) => {
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
    />
  );
};
