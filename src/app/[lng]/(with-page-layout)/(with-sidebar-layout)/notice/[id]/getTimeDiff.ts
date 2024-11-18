import dayjs, { Dayjs } from 'dayjs';

export const isServer = typeof window === 'undefined';

const CLIENT_SERVER_TIME_OFFSET_SECONDS = 10
export const getTimeDiff = (createdAt: Dayjs | string) => {
  const currentTime = dayjs();
  const diffInSeconds = dayjs(createdAt)
    .subtract(CLIENT_SERVER_TIME_OFFSET_SECONDS, 'second')
    .diff(currentTime, 'second');
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return { minutes, seconds };
};
