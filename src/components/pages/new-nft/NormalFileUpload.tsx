import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '../../common/button';
import { Text } from '@chakra-ui/react';

interface FileUploadProps {
  accessToken: any;
}

const NormalFileUpload: React.FC<FileUploadProps> = ({ accessToken }) => {
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

    const formData = new FormData();
    const boundary = Symbol();

    try {
      const filesParam = await Promise.all(
        files.map(async (file) => {
          return {
            data: new Blob([], { type: file.type }),
            fileName: file.name,
          };
        }),
      );

      filesParam.forEach((item) => {
        formData.append('file', item.data, item.fileName ? item.fileName : 'file');
      });

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/form-data; boundary=${boundary.toString()}`,
          Encryption: `${false}`,
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
export default NormalFileUpload;
