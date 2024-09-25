import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { createTranslation, PropsWithLng } from '@/app/i18next';

interface DDayProps {
  deadline: dayjs.Dayjs | string;
  className?: string;
}

// Caller or its (grand)parents should have `import '@/app/initDayjs';`
const DDay = async ({ deadline, lng, className }: PropsWithLng<DDayProps>) => {
  const { t } = await createTranslation(lng);

  const isClosed = dayjs(deadline).isBefore();

  return (
    <p
      className={`
        h-fit rounded-md px-[10px] py-[3px] text-[14px] text-white dark:text-text 
        ${isClosed ? 'bg-greyDark ' : 'bg-primary '} 
        ${className}
      `}
    >
      {isClosed ? (
        t('ddayPlus')
      ) : (
        <Trans t={t} i18nKey={'zabo.timeLeft'}>
          {{ timeLeft: dayjs(deadline).locale(lng).fromNow(true) }}
        </Trans>
      )}
    </p>
  );
};

export default DDay;
