import { useState, useEffect } from 'react';

import { WEDDING_DATE_ISO, COUNTDOWN_INTERVAL_MS } from '../constants';
import { computeTimeRemaining } from '../utils/dateHelpers';

const useCountdown = (dateIso) => {
  const iso = dateIso || WEDDING_DATE_ISO;

  const getTarget = () => new Date(`${iso}T17:00:00`);

  const [timeLeft, setTimeLeft] = useState(() => computeTimeRemaining(getTarget()));

  useEffect(() => {
    const target = new Date(`${iso}T17:00:00`);
    setTimeLeft(computeTimeRemaining(target));

    const intervalId = setInterval(() => {
      setTimeLeft(computeTimeRemaining(target));
    }, COUNTDOWN_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [iso]);

  return timeLeft;
};

export default useCountdown;
