import { useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  setInterval(() => {
    setTime(new Date());
  }, 1000);
  return (
    <div style={{ margin: '10px 0' }}>
      <h2>현재시간 : {time.toLocaleTimeString()}</h2>
    </div>
  );
};
export default Clock;
