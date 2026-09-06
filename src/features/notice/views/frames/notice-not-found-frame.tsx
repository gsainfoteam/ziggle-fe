import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components';

import { PanelShell } from '../components/layout/panel-shell';

export function NoticeNotFoundFrame() {
  const { t } = useTranslation('notice');
  return (
    <PanelShell>
      <div className="flex flex-1 items-center justify-center p-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            404
          </h1>
          <p className="text-muted-foreground text-base">
            {t('not_found.title')}
          </p>
          <Link to="/home">
            <Button variant="contained">{t('not_found.go_back')}</Button>
          </Link>
        </div>
      </div>
    </PanelShell>
  );
}
