import { useState, useEffect } from 'react';

interface CountdownOptions {
  initialSeconds: number;
  onComplete?: () => void;
}

const useCountdown = (options: CountdownOptions) => {
  const { initialSeconds, onComplete } = options;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) {
      setIsRunning(false);
      onComplete?.();
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, onComplete]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  return { seconds, isRunning, start, pause, reset };
};

export default useCountdown;