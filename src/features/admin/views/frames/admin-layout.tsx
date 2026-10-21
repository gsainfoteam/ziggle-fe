import { Link, Outlet } from '@tanstack/react-router';

import {
  ShieldCheckIcon,
  NewspaperIcon,
  UsersIcon,
  ArrowLeftIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button, Loading, ZiggleLogo } from '@/common/components';

import { useAdminAccess } from '../../viewmodels';

export function AdminLayout() {
  const { user, isAdmin, isLoading, error, refetch } = useAdminAccess();
  const { t } = useTranslation('admin');
  if (isLoading || user === undefined) return <Loading />;
  if (!isAdmin)
    return (
      <main className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
        <ShieldCheckIcon className="text-primary size-12" />
        <h1 className="text-2xl font-semibold">{t('access.title')}</h1>
        <p className="text-muted-foreground">
          {error
            ? t('access.error')
            : user
              ? t('access.denied')
              : t('access.login')}
        </p>
        {error && (
          <Button variant="outlined" onClick={() => void refetch()}>
            {t('retry')}
          </Button>
        )}
        <Link to="/home" className="text-primary font-medium">
          {t('back_home')}
        </Link>
      </main>
    );
  return (
    <div className="bg-muted text-foreground min-h-dvh md:flex">
      <aside className="border-border bg-background flex flex-col gap-6 border-b p-5 md:sticky md:top-0 md:h-dvh md:w-64 md:shrink-0 md:border-r md:border-b-0 md:p-6">
        <Link to="/home">
          <ZiggleLogo variant="compact" className="h-8" />
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheckIcon className="text-primary size-5" />
          {t('title')}
        </div>
        <nav aria-label={t('navigation')} className="flex gap-2 md:flex-col">
          <Link
            to="/admin/notices"
            search={{ page: 0 }}
            className="hover:bg-muted flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
            activeProps={{
              className: 'bg-secondary text-primary font-semibold',
            }}
          >
            <NewspaperIcon className="size-5" />
            {t('notices.title')}
          </Link>
          <Link
            to="/admin/permissions"
            className="hover:bg-muted flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
            activeProps={{
              className: 'bg-secondary text-primary font-semibold',
            }}
          >
            <UsersIcon className="size-5" />
            {t('permissions.title')}
          </Link>
        </nav>
        <div className="mt-auto hidden space-y-4 md:block">
          <p className="text-muted-foreground truncate text-sm">{user?.name}</p>
          <Link
            to="/home"
            className="text-muted-foreground flex items-center gap-2 text-sm"
          >
            <ArrowLeftIcon />
            {t('back_home')}
          </Link>
        </div>
      </aside>
      <main className="mx-auto min-w-0 flex-1 p-5 md:max-w-7xl md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
