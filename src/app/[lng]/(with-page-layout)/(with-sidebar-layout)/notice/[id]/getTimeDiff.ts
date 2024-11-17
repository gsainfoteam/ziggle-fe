import dayjs, { Dayjs } from 'dayjs';

export const isServer = typeof window === 'undefined';
export const getTimeDiff = (createdAt: Dayjs | string) => {
  const currentTime = dayjs();
  const diffInSeconds = dayjs(createdAt)
    .subtract(10, 'second')
    .diff(currentTime, 'second');
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return { minutes, seconds };
};
