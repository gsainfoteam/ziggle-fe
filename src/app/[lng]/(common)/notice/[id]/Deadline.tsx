import dayjs from 'dayjs';

import { createTranslation, PropsWithLng } from '@/app/i18next';

interface DeadlineProps extends PropsWithLng {
  deadline: dayjs.Dayjs;
}

const Deadline = async ({ deadline, lng }: DeadlineProps) => {
  const { t } = await createTranslation(lng);

  return (
    <div className="flex w-fit gap-[10px] rounded-[5px] bg-primary px-[13px] py-1 text-lg text-white">
      <span className="font-regular">{t('zabo.dueAt')}</span>
      <span className="font-medium">{deadline.format('LLL')}</span>
    </div>
  );
};

export default Deadline;
