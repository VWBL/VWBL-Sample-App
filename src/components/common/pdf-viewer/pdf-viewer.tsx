import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
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
    <Box w='100%' ref={targetRef} maxH='70vh'>
      <HStack justifyContent='center' p={6}>
        <IconButton
          aria-label='PreviousPage'
          icon={<ChevronLeftIcon />}
          isDisabled={pageNumber === 1 ? true : false}
          onClick={onClickPreviousPage}
        />
        <Text color='white' px={10}>
          Page {pageNumber} of {numPages}
        </Text>
        <IconButton
          aria-label='NextPage'
          icon={<ChevronRightIcon />}
          isDisabled={pageNumber === numPages ? true : false}
          onClick={onClickNextPage}
        />
      </HStack>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} canvasBackground='gray' width={width / 3} />
      </Document>
    </Box>
  );
};
