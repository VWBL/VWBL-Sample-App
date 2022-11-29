import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Text, HStack } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import { usePdfViewer } from '../../../hooks/pdf-viewer';

import workerSrc from '../../../../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  fileUrl: string;
};

export const PdfViewer: React.FC<Props> = ({ fileUrl }) => {
  const { numPages, pageNumber, onDocumentLoadSuccess, onClickNextPage, onClickPreviousPage, targetRef, width } = usePdfViewer();

  return (
    <Box w='100%' ref={targetRef}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} width={width} />
      </Document>
      <HStack justifyContent='center' p={6}>
        <ChevronLeftIcon w={30} h={30} color={pageNumber === 1 ? 'gray' : 'white'} onClick={onClickPreviousPage} />
        <Text color='white' px={10}>
          Page {pageNumber} of {numPages}
        </Text>
        <ChevronRightIcon w={30} h={30} color={pageNumber === numPages ? 'gray' : 'white'} onClick={onClickNextPage} />
      </HStack>
    </Box>
  );
};
