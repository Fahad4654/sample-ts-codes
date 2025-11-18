interface UploadResult {
  filename: string;
  size: number;
  contentType: string;
  url: string;
}

async function handleFileUpload(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return await response.json() as UploadResult;
}

async function uploadButtonHandler(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  try {
    const result = await handleFileUpload(file);
    console.log('Upload successful:', result);
    alert(`File uploaded: ${result.filename}, Size: ${result.size}`);
  } catch (error) {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error}`);
  }
}

document.getElementById('uploadButton')?.addEventListener('change', uploadButtonHandler);