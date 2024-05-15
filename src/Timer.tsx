import { Button, Container, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import {
  POMODORO,
  SHORT_BREAK_DURATION,
  SHORT_BREAK,
  LONG_BREAK_DURATION,
  LONG_BREAK,
  POMODORO_DURATION,
} from './constants';

function Timer() {
  const [currentSeconds, setCurrentSeconds] = useState(POMODORO_DURATION);
  const time = new Date();
  time.setSeconds(time.getSeconds() + currentSeconds); // 10 minutes timer
  const { minutes, seconds, start, resume, restart, pause, isRunning } =
    useTimer({
      expiryTimestamp: time,
      autoStart: false,
      onExpire: () => {},
    });

  const resetTimeHandler = (resetSeconds: number) => {
    setCurrentSeconds(resetSeconds);
    const resetTime = new Date();
    resetTime.setSeconds(resetTime.getSeconds() + resetSeconds);
    restart(resetTime);
  };

  const getButtonVariant = (secondsValue: number) => {
    if (secondsValue === currentSeconds) return 'outlined';
    return 'text';
  };

  return (
    <Container sx={{ height: '80vh' }}>
      <Box textAlign="center" sx={{ py: '10px' }}>
        <Button
          variant={getButtonVariant(POMODORO_DURATION)}
          onClick={() => resetTimeHandler(POMODORO_DURATION)}
        >
          {POMODORO}
        </Button>
        <Button
          variant={getButtonVariant(SHORT_BREAK_DURATION)}
          onClick={() => resetTimeHandler(SHORT_BREAK_DURATION)}
        >
          {SHORT_BREAK}
        </Button>
        <Button
          variant={getButtonVariant(LONG_BREAK_DURATION)}
          onClick={() => resetTimeHandler(LONG_BREAK_DURATION)}
        >
          {LONG_BREAK}
        </Button>
      </Box>
      <Typography variant="h2" textAlign="center">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      <Box textAlign="center">
        <Button
          sx={{ my: '4px', mx: '2px' }}
          variant="contained"
          color="success"
          onClick={() => {
            start();
            resume();
          }}
          disabled={isRunning}
        >
          Start
        </Button>
        <Button
          sx={{ my: '4px', mx: '2px' }}
          variant="contained"
          color="error"
          onClick={pause}
          disabled={!isRunning}
        >
          Pause
        </Button>
        <Button
          sx={{ my: '4px', mx: '2px' }}
          variant="contained"
          color="secondary"
          onClick={() => resetTimeHandler(currentSeconds)}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
}

export default Timer;
