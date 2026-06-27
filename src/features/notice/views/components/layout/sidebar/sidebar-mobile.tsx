import { useMobileSidebar } from '@/features/notice/viewmodels';

import { Sidebar } from './sidebar';

export const SidebarMobile = () => {
  const close = useMobileSidebar((state) => state.close);

  return (
    <aside className="dark:bg-dark_dark w-sidebarMobile fixed top-0 left-0 z-0 h-screen scrollbar-none overflow-y-auto bg-white px-2.5 py-2.5 md:hidden">
      <Sidebar onClose={close} />
      <div className="h-25" />
    </aside>
  );
};
