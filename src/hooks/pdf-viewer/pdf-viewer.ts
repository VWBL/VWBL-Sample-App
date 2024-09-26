'use client';

import { useState, useCallback } from 'react';


interface PDFLoadSuccess {
  numPages: number;
}

export const usePdfViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = useCallback(({ numPages }: PDFLoadSuccess) => {
    setNumPages(numPages);
  }, []);

  const onClickNextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber((prev) => prev + 1);
  };

  const onClickPreviousPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prev) => prev - 1);
  };

  return {
    numPages,
    pageNumber,
    onDocumentLoadSuccess,
    onClickNextPage,
    onClickPreviousPage,
  };
};
