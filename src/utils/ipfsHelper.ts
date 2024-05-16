import axios from 'axios';
import { IPFSConfig } from 'vwbl-sdk';

const lighthouseEndpoint = 'https://node.lighthouse.storage/api/v0/add';

// Encrypted file upload function
export const uploadEncryptedFileToLighthouse = async (encryptedContent: string | ArrayBuffer, ipfsConfig?: IPFSConfig): Promise<string> => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }

  const formData = new FormData();
  formData.append('file', new Blob([encryptedContent], { type: 'application/octet-stream' }));

  const config = {
    headers: {
      Authorization: `Bearer ${ipfsConfig.apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  try {
    const response = await axios.post(lighthouseEndpoint, formData, config);
    return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
  } catch (err: any) {
    throw new Error(`Lighthouse upload failed: ${err.message}`);
  }
};

// Thumbnail upload function
export type FileOrPath = File | string;
export const uploadThumbnailToLighthouse = async (thumbnailImage: FileOrPath, ipfsConfig?: IPFSConfig): Promise<string> => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }

  const formData = new FormData();

  // thumbnailImageがFile型かstring型かをチェックして処理
  if (thumbnailImage instanceof File) {
    formData.append('file', thumbnailImage);
  } else {
    // string型の場合、Blobとして処理
    const response = await fetch(thumbnailImage);
    const blob = await response.blob();
    formData.append('file', new File([blob], 'thumbnail', { type: blob.type }));
  }

  const config = {
    headers: {
      Authorization: `Bearer ${ipfsConfig.apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  try {
    const response = await axios.post('lighthouseEndpoint', formData, config);
    return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
  } catch (err: any) {
    throw new Error(`Lighthouse upload failed: ${err.message}`);
  }
};
// Metadata upload function
export const uploadMetadataToLighthouse = async (
  name: string,
  description: string,
  previewImageUrl: string,
  encryptedDataUrls: string[],
  mimeType: string,
  encryptLogic: string,
  ipfsConfig?: IPFSConfig,
): Promise<string> => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }

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
      Authorization: `Bearer ${ipfsConfig.apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`アップロード進行中: ${progress}%`);
    },
  };

  try {
    const response = await axios.post(lighthouseEndpoint, formData, config);
    return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
  } catch (err: any) {
    throw new Error(`Lighthouse upload failed: ${err.message}`);
  }
};
