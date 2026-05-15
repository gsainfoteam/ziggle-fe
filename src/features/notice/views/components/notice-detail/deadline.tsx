import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface NoticeDetailDeadlineProps {
  deadline?: string | null;
}

export const NoticeDetailDeadline = ({
  deadline,
}: NoticeDetailDeadlineProps) => {
  const { t } = useTranslation('notice');
  if (!deadline) return null;
  return (
    <div className="bg-primary dark:text-dark_white flex w-fit gap-2.5 rounded-[5px] px-3.25 py-1 text-lg text-white">
      {t('detail.due_at', { dueAt: dayjs(deadline).tz().format('LLL') })}
    </div>
  );
};
