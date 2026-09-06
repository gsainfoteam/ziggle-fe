import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next/TransWithoutContext';

import { cn } from '@/common/utils';

interface NoticeCardDDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

export const NoticeCardDDay = ({
  deadline,
  className,
}: NoticeCardDDayProps) => {
  const { t } = useTranslation('notice');
  const isClosed = dayjs(deadline).isBefore();
  return (
    <p
      className={cn(
        'text-on-primary h-fit rounded-md px-2.5 py-0.75 text-sm',
        isClosed ? 'bg-muted-foreground' : 'bg-primary',
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
