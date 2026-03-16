import { Button } from '@/common/components';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export function NoticeNotFoundFrame() {
  const { t } = useTranslation('notice');

  const navigateHome = useNavigate();
  return (
    <div className="flex h-[calc(80vh)] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <p className="mb-3 text-xl">{t('noticeNotFound.message')}</p>

        <Button
          className="w-80"
          variant="outlined"
          onClick={() => navigateHome({ to: '/' })}
        >
          {t('noticeNotFound.goHome')}
        </Button>
      </div>
    </div>
  );
}
