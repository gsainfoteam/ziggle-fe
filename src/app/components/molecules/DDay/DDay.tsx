import dayjs from 'dayjs';

import { PropsWithT, T } from '@/app/i18next';

interface DDayProps {
  deadline: dayjs.Dayjs;
  className?: string;
}

const DDay = ({ deadline, t, className }: PropsWithT<DDayProps>) => (
  <div
    className={[
      'grid w-fit place-items-center ' +
        'rounded border border-white bg-primary/90 px-2 py-0.5',
      ...(className ? [className] : []),
    ].join(' ')}
  >
    <div className="text-sm font-bold text-white md:text-lg">
      {ddayFormatted(dayjs(deadline).tz(), t)}
    </div>
  </div>
);

const ddayFormatted = (deadline: dayjs.Dayjs, t: T) => {
  const daysLeft = deadline.diff(dayjs(), 'day', true);

  if (daysLeft < 0) return t('ddayPlus');
  if (daysLeft < 1) return 'D - Day';
  return `D - ${Math.floor(daysLeft)}`;
};

export default DDay;
