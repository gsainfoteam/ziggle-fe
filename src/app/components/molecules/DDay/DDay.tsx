import dayjs from 'dayjs';

import { T } from '@/app/i18next';

interface DDayProps {
  deadline: dayjs.Dayjs;
  className?: string;
}

const DDay = ({ deadline, t, className }: DDayProps & { t: T }) => (
  <div
    className={[
      'grid place-items-center w-fit ' +
        'border border-white rounded bg-primary/90 px-2 py-0.5',
      ...(className ? [className] : []),
    ].join(' ')}
  >
    <div className="text-white text-sm md:text-lg font-bold">
      {ddayFormatted(dayjs(deadline), t)}
    </div>
  </div>
);

const ddayFormatted = (deadline: dayjs.Dayjs, t: T) => {
  const daysLeft = deadline.startOf('d').diff(dayjs().startOf('d'), 'd');

  if (daysLeft < 0) return t('ddayPlus');
  if (daysLeft === 0) return 'D - Day';
  return `D - ${daysLeft}`;
};

export default DDay;
