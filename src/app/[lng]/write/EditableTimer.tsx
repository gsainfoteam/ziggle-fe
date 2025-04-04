'use client';

import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { calculateRemainingTime } from '@/app/[lng]/write/calculateRemainingTime';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

interface EditableTimerProps {
  createdAt: Dayjs | string;
}

const EditableTimer = ({
  createdAt,
  lng,
}: PropsWithLng<EditableTimerProps>) => {
  const { t } = useTranslation(lng);

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
      className={
        'rounded-[15px] px-5 py-[15px] text-center text-lg ' +
        (isEditable
          ? 'bg-secondary text-primary'
          : 'bg-greyLight text-greyDark')
      }
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
