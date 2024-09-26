'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { usePdfViewer } from '../../../hooks/pdf-viewer';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { useCallback, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
const resizeObserverOptions = {};

type Props = {
  fileUrl: string;
};

const maxWidth = 800;
export const PdfViewer: React.FC<Props> = ({ fileUrl }) => {
  const { numPages, pageNumber, onDocumentLoadSuccess, onClickNextPage, onClickPreviousPage } = usePdfViewer();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <Box w='100%' h='80%'>
      <Box w='100%' h='80%' display='flex' justifyContent='center' ref={setContainerRef}>
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            canvasBackground='gray'
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
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
