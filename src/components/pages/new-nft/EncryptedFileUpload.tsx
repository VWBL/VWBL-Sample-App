import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '../../common/button';
import { Text } from '@chakra-ui/react';
import { createRandomKey, encryptString } from 'vwbl-sdk';

interface FileUploadProps {
  accessToken: any;
}

const createKey = (): string => {
  return createRandomKey();
};

const toBase64FromBlob = async (blob: Blob): Promise<string> => {
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

const encryptDataViaBase64 = async (plainData: File, key: string): Promise<string> => {
  const content = await toBase64FromBlob(plainData);
  return encryptString(content, key);
};

const EncryptedFileUpload: React.FC<FileUploadProps> = ({ accessToken }) => {
  const [files, setFiles] = useState<File[]>([]);
  const endpoint = 'https://node.lighthouse.storage/api/v0/add';

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert('ファイルを選択してください。');
      return;
    }

    const key = createKey();
    const formData = new FormData();

    try {
      for (const file of files) {
        const encryptedData = await encryptDataViaBase64(file, key);
        formData.append('file', new Blob([encryptedData]), file.name);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          Encryption: 'true',
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`アップロード進行中: ${progress}%`);
        },
      };

      const response = await axios.post(endpoint, formData, config);
      console.log('アップロード成功:', response.data);
    } catch (error) {
      console.error('アップロード失敗:', error);
    }
  };
  return (
    <>
      <Text fontSize='xl' mb={6}>
        動作確認UI
      </Text>
      <input type='file' multiple onChange={handleFileChange} />
      <Button text='ファイルをアップロード' onClick={handleUpload} width='80%' mb={20} mt={6} />
    </>
  );
};

export default EncryptedFileUpload;
