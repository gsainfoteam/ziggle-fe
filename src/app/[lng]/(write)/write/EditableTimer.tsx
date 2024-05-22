'use client';

import { Dayjs } from 'dayjs';
import { PropsWithLng } from '@/app/i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/app/i18next/client';
import { calculateTimeRemaining } from '@/utils/utils';

interface EditableTimerProps {
  createdAt: Dayjs;
}

const EditableTimer = ({
  createdAt,
  lng,
}: PropsWithLng<EditableTimerProps>) => {
  const { t } = useTranslation(lng);

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(createdAt),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isEditable = timeRemaining.minutes > 0 && timeRemaining.seconds > 0;

  return (
    <p
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
            {`${timeRemaining.minutes}:${timeRemaining.seconds}`}
          </span>
        </>
      ) : (
        t('write.uneditable')
      )}
    </p>
  );
};

export default EditableTimer;
