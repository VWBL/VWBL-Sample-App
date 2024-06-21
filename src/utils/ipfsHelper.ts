import axios from 'axios';
import { Readable } from 'stream';
import { IPFSConfig } from 'vwbl-sdk';
const lighthouseEndpoint: string = 'https://node.lighthouse.storage/api/v0/add';

const createLighthouseConfig = (ipfsConfig?: IPFSConfig) => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }

  return {
    headers: {
      Authorization: `Bearer ${ipfsConfig.apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`uploadEncryptedFileToLighthouse: ${progress}%`);
    },
  };
};

const uploadToLighthouse = async (formData: FormData, ipfsConfig?: IPFSConfig): Promise<string> => {
  const config = createLighthouseConfig(ipfsConfig);

  try {
    const response = await axios.post(lighthouseEndpoint, formData, config);
    return `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
  } catch (err: any) {
    throw new Error(`Lighthouse upload failed: ${err.message}`);
  }
};

export const uploadEncryptedFileToLighthouse = async (
  encryptedContent: string | Uint8Array | Readable,
  ipfsConfig?: IPFSConfig,
): Promise<string> => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }
  const formData = new FormData();
  if (typeof encryptedContent === 'string') {
    formData.append('file', new Blob([encryptedContent], { type: 'application/octet-stream' }));
  } else if (encryptedContent instanceof Uint8Array) {
    formData.append('file', new Blob([encryptedContent], { type: 'application/octet-stream' }));
  } else {
    const chunks = [];
    for await (const chunk of encryptedContent) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    formData.append('file', new Blob([buffer], { type: 'application/octet-stream' }));
  }
  return await uploadToLighthouse(formData, ipfsConfig);
};


type FileOrPath = string | Blob | File;
export const uploadThumbnailToLighthouse = async (thumbnailImage: FileOrPath, ipfsConfig?: IPFSConfig): Promise<string> => {
  if (!ipfsConfig || !ipfsConfig.apiKey) {
    throw new Error('Lighthouse API key is not specified.');
  }

  const formData = new FormData();

  if (thumbnailImage instanceof File) {
    formData.append('file', thumbnailImage);
  } else if (typeof thumbnailImage === 'string') {
    const response = await fetch(thumbnailImage);
    const blob = await response.blob();
    formData.append('file', new File([blob], 'thumbnail', { type: blob.type }));
  } else if (thumbnailImage instanceof Blob) {
    formData.append('file', thumbnailImage);
  }

  return await uploadToLighthouse(formData, ipfsConfig);
};

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

  return await uploadToLighthouse(formData, ipfsConfig);
};
