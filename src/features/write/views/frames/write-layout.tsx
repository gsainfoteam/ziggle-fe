import { Outlet } from '@tanstack/react-router';

import { Loading } from '@/common/components';
import { useUser } from '@/features/auth';
import { NoticeSkeletonLayout } from '@/features/notice';

import { WriteShell } from '../components/layout/write-shell';

export const WriteLayout = () => {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user === null) return <NoticeSkeletonLayout />;
  return (
    <WriteShell>
      <Outlet />
    </WriteShell>
  );
};
