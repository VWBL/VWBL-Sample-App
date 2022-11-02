import { useState, useCallback, useEffect } from 'react';
import { Image, Box, Button } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
import { ExtractMetadata } from 'vwbl-sdk';

import { VALID_EXTENSIONS } from '../../../utils';
import { FetchedNFT } from '../../types';

type Props = {
  nft: FetchedNFT | ExtractMetadata;
};

const isExtractMetadata = (token: FetchedNFT | ExtractMetadata): token is ExtractMetadata => {
  return !!(token as ExtractMetadata)?.ownDataBase64;
};

export const FileViewer: React.FC<Props> = ({ nft }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileUrl, setFileUrl] = useState('');

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const download = useCallback(() => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.click();
    a.remove();
  }, [fileUrl]);

  useEffect(() => {
    if (isExtractMetadata(nft)) {
      const url =
        nft.encryptLogic == 'base64'
          ? nft.ownDataBase64[0]
          : URL.createObjectURL(new Blob(nft.ownFiles as ArrayBuffer[], { type: nft.mimeType })); //TODO: fix type of ownFiles
      setFileUrl(url);
    }

    // unset memory when unmount
    return () => URL.revokeObjectURL(fileUrl);
  }, []);

  const switchViewer = useCallback(
    (nft: FetchedNFT | ExtractMetadata) => {
      if (isExtractMetadata(nft)) {
        if (nft.mimeType.match(VALID_EXTENSIONS.image)) {
          return <Image src={fileUrl} alt='original data' rounded='md' width='100%' height='100%' objectFit='contain' />;
        } else if (nft.mimeType.match(VALID_EXTENSIONS.video)) {
          return <ReactPlayer url={fileUrl} controls={true} width='100%' height='100%' />;
        } else if (nft.mimeType.match(VALID_EXTENSIONS.audio)) {
          return <ReactPlayer url={fileUrl} controls={true} height='54px' />;
        } else if (nft.mimeType.includes('pdf')) {
          return (
            <>
              <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </>
          );
        } else {
          return <Button onClick={download}>Download</Button>;
        }
      } else {
        return <Image src={nft.image} alt='thumbnail data' rounded='md' />;
      }
    },
    [numPages, onDocumentLoadSuccess, pageNumber, fileUrl],
  );

  return (
    <Box mx='auto' maxH='100%' maxW='100%' display='flex' justifyContent='center' alignItems='center'>
      {switchViewer(nft)}
    </Box>
  );
};
