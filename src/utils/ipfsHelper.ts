import { Blob, File, NFTStorage } from 'nft.storage';
import { PlainMetadata, EncryptLogic } from 'vwbl-sdk';

export class UploadToIPFS {
  private client: NFTStorage;
  constructor(ipfsNftStorageKey: string) {
    this.client = new NFTStorage({ token: ipfsNftStorageKey });
  }

  async uploadEncryptedFile(encryptedContent: string | ArrayBuffer): Promise<string> {
    const encryptedContentData = new Blob([encryptedContent]);

    let cid;
    try {
      cid = await this.client.storeBlob(encryptedContentData);
    } catch (err) {
      // 'Error' 型を使用してエラーをキャッチ
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err; // 予期せぬ型のエラーが発生した場合、元のエラーをスロー
    }

    return `https://nftstorage.link/ipfs/${cid}`;
  }

  async uploadThumbnail(thumbnailImage: File): Promise<string> {
    const thumbnailblob = new Blob([thumbnailImage], { type: thumbnailImage.type });

    let cid;
    try {
      cid = await this.client.storeBlob(thumbnailblob);
    } catch (err) {
      // 'Error' 型を使用してエラーをキャッチ
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err; // 予期せぬ型のエラーが発生した場合、元のエラーをスロー
    }

    return `https://nftstorage.link/ipfs/${cid}`;
  }

  async uploadMetadata(
    name: string,
    description: string,
    previewImageUrl: string,
    encryptedDataUrls: string[],
    mimeType: string,
    encryptLogic: EncryptLogic,
  ): Promise<string> {
    const metadata: PlainMetadata = {
      name,
      description,
      image: previewImageUrl,
      encrypted_data: encryptedDataUrls,
      mime_type: mimeType,
      encrypt_logic: encryptLogic,
    };

    const metadataJSON = JSON.stringify(metadata);
    const metaDataBlob = new Blob([metadataJSON]);

    let cid;
    try {
      cid = await this.client.storeBlob(metaDataBlob);
    } catch (err) {
      // 'Error' 型を使用してエラーをキャッチ
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err; // 予期せぬ型のエラーが発生した場合、元のエラーをスロー
    }

    return `https://nftstorage.link/ipfs/${cid}`;
  }
}
