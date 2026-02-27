import { Outlet } from '@tanstack/react-router';

import { Sidebar } from '../components/sidebar';

export function NoticeSidebarLayout() {
  return (
    <>
      <div className="sticky top-20 my-6 ml-4 hidden h-fit self-start md:block">
        <Sidebar />
      </div>

      <div className="w-0 grow md:mx-5">
        <Outlet />
      </div>
    </>
  );
}
