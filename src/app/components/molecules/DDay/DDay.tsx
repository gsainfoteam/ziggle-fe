import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation, PropsWithLng } from '@/app/i18next';

interface DDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

const DDay = async ({ deadline, lng, className }: PropsWithLng<DDayProps>) => {
  const isClosed = dayjs(deadline).isBefore();

  const { t } = await createTranslation(lng);

  return (
    <p
      className={
        `h-fit rounded-md ${
          isClosed ? 'bg-greyDark' : 'bg-primary'
        } px-[10px] py-[3px] text-[14px] text-white dark:text-text ` + className
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
