import { Outlet } from '@tanstack/react-router';

import { Sidebar } from '../components/layout/sidebar';

export function NoticeSidebarLayout() {
  return (
    <>
      <div className="sticky top-20 my-6 ml-4 hidden h-fit w-40 shrink-0 self-start md:block">
        <Sidebar />
      </div>

      <div className="w-0 grow md:mx-5">
        <Outlet />
      </div>

      <div className="hidden md:block md:w-14 md:shrink-0" />
    </>
  );
}
