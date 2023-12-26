import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function MyStopwatch() {
  const {
    seconds,
    minutes,
    hours,
    pause,
    reset
  } = useStopwatch({ autoStart: true });

  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '30px'}}>
        <p onChange={ pause } id="timerText"><span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span></p>
      </div>
    </div>
  );
}