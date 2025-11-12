import React, { useState, useEffect } from 'react';

interface ClockProps {
  format?: '12' | '24';
}

const Clock: React.FC<ClockProps> = ({ format = '24' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = format === '12'
    ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    : time.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });

  return (
    <div>
      {formattedTime}
    </div>
  );
};

export default Clock;