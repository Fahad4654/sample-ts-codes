import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfFile: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => (prevPageNumber <= 1 ? 1 : prevPageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) =>
      numPages && prevPageNumber >= numPages ? numPages : prevPageNumber + 1
    );
  };

  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <div>
        <button onClick={goToPrevPage}>Prev</button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
};

export default PDFViewer;