import axios from 'axios';
import { createRandomKey, encryptString } from 'vwbl-sdk';

const endpoint = 'https://node.lighthouse.storage/api/v0/add';

export const createKey = (): string => {
  return createRandomKey();
};

export const toBase64FromBlob = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('ファイルの読み込みに失敗しました'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};

export const encryptDataViaBase64 = async (plainData: Blob, key: string): Promise<string> => {
  const content = await toBase64FromBlob(plainData);
  return encryptString(content, key);
};

export const uploadEncryptedFileCallback = async (encryptedContent: Blob, apiKey: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', encryptedContent);

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
      Encryption: 'true',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  const response = await axios.post(endpoint, formData, config);
  return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
};

export const uploadThumbnailCallback = async (thumbnailImage: File, apiKey: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', thumbnailImage);

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  const response = await axios.post(endpoint, formData, config);
  return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
};

export const uploadMetadataCallback = async (
  name: string,
  description: string,
  previewImageUrl: string,
  encryptedDataUrls: string[],
  mimeType: string,
  encryptLogic: string,
  apiKey: string,
): Promise<string> => {
  const metadata = {
    name,
    description,
    image: previewImageUrl,
    encrypted_data: encryptedDataUrls,
    mime_type: mimeType,
    encrypt_logic: encryptLogic,
  };

  const metadataJSON = JSON.stringify(metadata);
  const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });

  const formData = new FormData();
  formData.append('file', metadataBlob);

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  const response = await axios.post(endpoint, formData, config);
  return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
};
