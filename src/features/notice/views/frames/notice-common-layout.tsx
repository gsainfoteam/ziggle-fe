import { Navigate, Outlet } from '@tanstack/react-router';

import { Footer, Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { Navbar } from '../components/navbar';

export function NoticeCommonLayout() {
  // TODO: currently, notice common layout requires auth
  // afterwards, remove this check

  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user === null) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mb-96 flex flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
