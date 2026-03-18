import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next/TransWithoutContext';

import { cn } from '@/common/utils';

interface DDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

const DDay = ({ deadline, className }: DDayProps) => {
  const { t } = useTranslation('notice');

  const isClosed = dayjs(deadline).isBefore();

  return (
    <p
      className={cn(
        'dark:text-text h-fit rounded-md px-2.5 py-0.75 text-[14px] text-white',
        isClosed ? 'bg-greyDark' : 'bg-primary',
        className,
      )}
    >
      {isClosed ? (
        t('list.d_day_plus')
      ) : (
        <Trans t={t} i18nKey={'detail.time_left'}>
          {{ timeLeft: dayjs(deadline).fromNow(true) }} Left
        </Trans>
      )}
    </p>
  );
};

export default DDay;
