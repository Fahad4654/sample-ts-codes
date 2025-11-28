interface DownloadOptions {
  filename?: string;
  mimeType?: string;
}

async function downloadFile(url: string, options: DownloadOptions = {}): Promise<void> {
  const { filename = 'downloaded_file', mimeType = 'application/octet-stream' } = options;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    const a = document.createElement('a');
    const urlObj = window.URL.createObjectURL(blob);

    a.href = urlObj;
    a.download = filename;
    a.type = mimeType;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(urlObj);

  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

export { downloadFile, DownloadOptions };