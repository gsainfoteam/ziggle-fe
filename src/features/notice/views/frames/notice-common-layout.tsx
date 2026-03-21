import { Outlet } from '@tanstack/react-router';

import { Footer, Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { Navbar } from '../components/navbar';

import NoticeSkeletonLayout from './notice-skeleton-layout';
export function NoticeCommonLayout() {
  // TODO: currently, notice common layout requires auth
  // afterwards, remove this check

  const { data: user } = useUser();

  if (user === undefined) return <Loading />;

  if (user === null) return <NoticeSkeletonLayout />;

  return (
    <div>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mb-96 flex flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
