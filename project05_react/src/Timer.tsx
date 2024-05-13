import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const timer = () => {
    setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
      <h2>타이머 : {seconds}초</h2>
      <Button variant='warning' onClick={timer}>
        시작
      </Button>
    </div>
  );
};
export default Timer;
