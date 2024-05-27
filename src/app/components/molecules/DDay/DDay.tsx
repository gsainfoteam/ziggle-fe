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
    <p
      className={
        `h-fit rounded-md ${
          isClosed ? 'bg-greyDark' : 'bg-primary'
        } px-[10px] py-[3px] text-[14px] text-white dark:text-text` + className
      }
    >
      {isClosed ? (
        t('ddayPlus')
      ) : (
        <Trans t={t} i18nKey={'zabo.timeLeft'}>
          {{ timeLeft: dayjs(deadline).fromNow(true) }}
        </Trans>
      )}
    </p>
  );
};

export default DDay;
