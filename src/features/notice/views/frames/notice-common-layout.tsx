import { Outlet } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NoticeShell } from '../components/layout/notice-shell';

export function NoticeCommonLayout() {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;

  return (
    <NoticeShell>
      <Outlet />
    </NoticeShell>
  );
}
