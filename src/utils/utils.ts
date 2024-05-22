import dayjs, { Dayjs } from 'dayjs';

export const isServer = typeof window === 'undefined';
export const calculateTimeRemaining = (createdAt: Dayjs) => {
  const currentTime = dayjs();
  // add not exact 15 minutes but 14:50 to consider network delays
  const diffInSeconds = dayjs(createdAt) // I don't know but createAt is passed as string
    .add(14, 'minutes')
    .add(50, 'seconds')
    .diff(currentTime, 'second');
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return { minutes, seconds };
};
