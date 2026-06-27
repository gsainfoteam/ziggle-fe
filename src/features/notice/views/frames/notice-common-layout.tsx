import { Outlet } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NoticeSkeletonLayout } from './notice-skeleton-layout';
import { NoticeShell } from '../components/layout/notice-shell';

export function NoticeCommonLayout() {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user === null) return <NoticeSkeletonLayout />;

  return (
    <NoticeShell>
      <Outlet />
    </NoticeShell>
  );
}
