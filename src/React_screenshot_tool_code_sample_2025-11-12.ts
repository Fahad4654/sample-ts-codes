import React, { useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

interface ScreenshotProps {
  children: React.ReactNode;
}

const Screenshot = ({ children }: ScreenshotProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const captureScreenshot = useCallback(async () => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current);
      const screenshotDataUrl = canvas.toDataURL('image/png');
      setScreenshotUrl(screenshotDataUrl);
    } catch (error) {
      console.error('Screenshot capture failed:', error);
    }
  }, []);

  return (
    <div>
      <div ref={targetRef}>{children}</div>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      {screenshotUrl && (
        <img
          src={screenshotUrl}
          alt="Screenshot"
          style={{ maxWidth: '300px' }}
        />
      )}
    </div>
  );
};

export default Screenshot;