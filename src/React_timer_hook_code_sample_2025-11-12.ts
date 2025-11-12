import { useState, useEffect, useRef } from 'react';

interface TimerHook {
  seconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const useTimer = (initialSeconds: number = 0): TimerHook => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearIntervalIfRunning();
  }, [isRunning]);

  const clearIntervalIfRunning = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    clearIntervalIfRunning();
  };

  const reset = () => {
    setIsRunning(false);
    clearIntervalIfRunning();
    setSeconds(initialSeconds);
  };

  return { seconds, isRunning, start, pause, reset };
};

export default useTimer;