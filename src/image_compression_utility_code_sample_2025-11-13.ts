type CompressionOptions = {
  quality?: number; // 0-100, default 75
  maxWidth?: number;
  maxHeight?: number;
};

async function compressImage(file: File, options: CompressionOptions = {}): Promise<Blob | null> {
  const { quality = 75, maxWidth, maxHeight } = options;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (maxWidth && width > maxWidth) {
          height = Math.round((maxWidth / width) * height);
          width = maxWidth;
        }

        if (maxHeight && height > maxHeight) {
          width = Math.round((maxHeight / height) * width);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            'image/jpeg',
            quality / 100
          );
        } else {
          resolve(null);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default compressImage;