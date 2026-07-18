import { useEffect, useState } from 'react';

import { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { calculateRemainingTime } from '../../../utils';

interface EditableTimerProps {
  createdAt: Dayjs | string;
}

const EditableTimer = ({ createdAt }: EditableTimerProps) => {
  const { t } = useTranslation('write');

  const [timeRemaining, setTimeRemaining] = useState(
    calculateRemainingTime(createdAt),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateRemainingTime(createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const isEditable = timeRemaining.minutes > 0 && timeRemaining.seconds >= 0;

  return (
    <p
      suppressHydrationWarning
      className={cn(
        'rounded-xl px-4 py-3 text-center text-sm md:text-base',
        isEditable
          ? 'bg-secondary text-primary'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {isEditable ? (
        <>
          {t('editable_timer.label')}{' '}
          <span className="font-bold">
            {`${timeRemaining.minutes}:${String(timeRemaining.seconds).padStart(
              2,
              '0',
            )}`}
          </span>
        </>
      ) : (
        t('uneditable')
      )}
    </p>
  );
};

export default EditableTimer;
