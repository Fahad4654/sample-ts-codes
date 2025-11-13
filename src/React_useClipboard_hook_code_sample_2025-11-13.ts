import { useState, useCallback } from 'react';

interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseClipboardResult {
  value: string;
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
}

const useClipboard = (options: UseClipboardOptions = {}): UseClipboardResult => {
  const { timeout = 2000, onSuccess, onError } = options;
  const [value, setValue] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      setCopied(true);
      onSuccess?.();
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (error: any) {
      setCopied(false);
      onError?.(error);
      return false;
    }
  }, [timeout, onSuccess, onError]);

  return { value, copied, copy };
};

export default useClipboard;