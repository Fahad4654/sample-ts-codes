import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

async function mergePdfs(pdfBuffers: Array<Buffer>): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const pdfBuffer of pdfBuffers) {
    try {
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    } catch (error) {
      console.error("Error loading or merging PDF:", error);
      // Handle the error appropriately, e.g., skip the file or return an error PDF
    }
  }

  return await mergedPdf.save();
}

// Example usage (replace with actual buffers)
async function example() {
  const pdfBuffer1 = Buffer.from([/* PDF data */]);
  const pdfBuffer2 = Buffer.from([/* PDF data */]);

  try {
    const mergedPdfBytes = await mergePdfs([pdfBuffer1, pdfBuffer2]);
    // Save mergedPdfBytes to a file or stream it to the user
    console.log("PDFs merged successfully!");

    // Example to download the merged PDF in browser:
    // const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'merged.pdf';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);


  } catch (error) {
    console.error("Error during PDF merging:", error);
  }
}

example();