import { Outlet } from '@tanstack/react-router';

import { Footer } from '@/common/components';

import { Navbar } from '../components/navbar';

export function NoticeCommonLayout() {
  return (
    <div>
      <Navbar />
      <div className="mb-96 flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
