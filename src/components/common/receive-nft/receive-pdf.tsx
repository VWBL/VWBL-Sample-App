import { ExtendedMetadeta } from 'vwbl-sdk';
import { ReceiveNFTContainer } from './receive-nft-container.ts';

const contents = {
  title: 'PDFのNFT を無料で受け取る',
  description: ['暗号屋の会社案内のPDFです。', 'VWBL はPDFにも対応しています'],
};

export const nft: ExtendedMetadeta = {
  id: 1,
  name: 'Ango-ya LLC',
  description: 'Company Information',
  image: 'https://gateway.lighthouse.storage/ipfs/QmZdZfr6CYKbn8jcZCs8SgeXFU12D13FP4oQcTdo4nbHoa',
  mimeType: 'application/pdf',
  encryptLogic: 'base64',
  address: '0x9850c4682475ac6bcB9CdA91F927CCc1574781C7',
};

export const nftKey = {
  metadataUrl: process.env.NEXT_PUBLIC_COMPANY_INFORMATION_URL || 'defaultEncryptionKey',
  key: process.env.NEXT_PUBLIC_COMPANY_INFORMATION_KEY || 'defaultEncryptionKey',
};

export const ReceivePdf: React.FC = () => {
  return (
    <ReceiveNFTContainer
      nft={nft}
      nftKey={nftKey}
      contents={contents}
      fetchContentUrl='/sample-nft-content.pdf'
      fetchThumbnailUrl='https://gateway.lighthouse.storage/ipfs/QmZdZfr6CYKbn8jcZCs8SgeXFU12D13FP4oQcTdo4nbHoa'
      successMessage='You have successfully received the PDF NFT'
      redirectUrl='/account/'
    />
  );
};
