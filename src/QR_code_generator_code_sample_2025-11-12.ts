import QRCode from 'qrcode';

interface QRCodeOptions {
  level?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  scale?: number;
  color?: {
    dark: string;
    light: string;
  };
}

async function generateQRCode(text: string, options: QRCodeOptions = {}): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, options);
    return qrCodeDataURL;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}

(async () => {
  const data = 'https://www.example.com';
  const qrCodeImage = await generateQRCode(data, {
    level: 'H',
    margin: 2,
    color: { dark: '#000', light: '#fff' },
  });

  if (qrCodeImage) {
    const qrCodeElement = document.createElement('img');
    qrCodeElement.src = qrCodeImage;
    qrCodeElement.alt = 'QR Code';
    document.body.appendChild(qrCodeElement);
  }
})();