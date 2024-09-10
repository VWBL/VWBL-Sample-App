import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePdfViewer } from '../../../hooks/pdf-viewer';
// import workerSrc from '../../../../pdf-worker.mjs';
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
type Props = {
  fileUrl: string;
};

export const PdfViewer: React.FC<Props> = ({ fileUrl }) => {
  const { numPages, pageNumber, onDocumentLoadSuccess, onClickNextPage, onClickPreviousPage, targetRef, width } = usePdfViewer();

  return (
    <Box w='100%' h='80%' ref={targetRef}>
      <Box w='100%' h='80%' display='flex' justifyContent='center'>
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            canvasBackground='gray'
            width={width / 1.5}
            height={200}
          />
        </Document>
      </Box>
      <HStack justifyContent='center' p={6}>
        <IconButton
          aria-label='PreviousPage'
          icon={<ChevronLeftIcon />}
          isDisabled={pageNumber === 1 ? true : false}
          onClick={onClickPreviousPage}
        />
        <Text color='white' px={3}>
          Page {pageNumber} of {numPages}
        </Text>
        <IconButton
          aria-label='NextPage'
          icon={<ChevronRightIcon />}
          isDisabled={pageNumber === numPages ? true : false}
          onClick={onClickNextPage}
        />
      </HStack>
    </Box>
  );
};
