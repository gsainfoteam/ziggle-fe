import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { PropsWithT, T } from '@/app/i18next';

interface DDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

const DDay = ({ deadline, t, className }: PropsWithT<DDayProps>) => {
  const isClosed = dayjs(deadline).isBefore();

  return (
    <div
      className={
        `h-fit rounded-md ${
          isClosed ? 'bg-greyDark' : 'bg-primary'
        } px-[10px] py-[3px] text-[14px] text-white ` + className
      }
    >
      {isClosed ? (
        t('ddayPlus')
      ) : (
        <Trans t={t} i18nKey={'zabo.timeLeft'}>
          {{ timeLeft: dayjs(deadline).fromNow(true) }}
        </Trans>
      )}
    </div>
  );
};

const ddayFormatted = (deadline: dayjs.Dayjs, t: T) => {
  const daysLeft = deadline.diff(dayjs(), 'day', true);

  if (daysLeft < 0) return t('ddayPlus');
  if (daysLeft < 1) return 'D - Day';
  return `D - ${Math.floor(daysLeft)}`;
};

export default DDay;
