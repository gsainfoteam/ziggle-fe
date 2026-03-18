import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export function NoticeNotFoundFrame() {
  const { t } = useTranslation('notice');
  return (
    <div className="flex h-[calc(80vh)] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <p className="mb-3 text-xl">{t('not_found.title')}</p>
        <Link to="/">
          <p className="bg-primary rounded-md px-4 py-1 text-lg">
            {t('not_found.go_back')}
          </p>
        </Link>
      </div>
    </div>
  );
}
