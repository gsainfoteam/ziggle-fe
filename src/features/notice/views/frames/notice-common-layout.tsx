import { Outlet } from '@tanstack/react-router';

import { AppBanner, Footer, Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NoticeSkeletonLayout } from './notice-skeleton-layout';
import { Navbar } from '../components/layout/navbar';
import { MobileShell } from '../components/layout/sidebar';

export function NoticeCommonLayout() {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user === null) return <NoticeSkeletonLayout />;

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <AppBanner />
          <Navbar />
        </div>
        <div className="mb-96 flex flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </MobileShell>
  );
}
