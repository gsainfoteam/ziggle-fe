import { useEffect, useState } from 'react';

import { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { calculateRemainingTime } from '../utils';

interface EditableTimerProps {
  createdAt: Dayjs | string;
}

const EditableTimer = ({ createdAt }: EditableTimerProps) => {
  const { t } = useTranslation('notice');

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
        'rounded-[15px] px-5 py-[15px] text-center text-lg',
        isEditable ? 'bg-secondary text-primary' : 'bg-greyLight text-greyDark',
      )}
    >
      {isEditable ? (
        <>
          {t('write.editableTimer')}{' '}
          <span className={'font-bold'}>
            {`${timeRemaining.minutes}:${String(timeRemaining.seconds).padStart(
              2,
              '0',
            )}`}
          </span>
        </>
      ) : (
        t('write.uneditable')
      )}
    </p>
  );
};

export default EditableTimer;
