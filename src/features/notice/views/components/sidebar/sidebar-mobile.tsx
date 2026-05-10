import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useUser } from '@/features/auth';

import { useMobileSidebar } from '../../../viewmodels';
import { ProfileModalButton } from '../profile-modal';
import { Sidebar } from './sidebar';

export const SidebarMobile = () => {
  const { data: user } = useUser();
  const { t } = useTranslation('layout');
  const close = useMobileSidebar((state) => state.close);

  return (
    <aside className="scrollbar-none dark:bg-dark_dark fixed top-0 left-0 z-0 h-screen w-[280px] overflow-y-auto bg-white px-2.5 md:hidden">
      {user ? (
        <ProfileModalButton
          triggerClassName="my-2.5 flex w-full cursor-pointer items-center gap-3 p-3"
          eventName={LogEvents.sidebarClickProfile}
        />
      ) : (
        <LogClick eventName={LogEvents.sidebarClickProfile}>
          <Link
            to="/"
            onClick={close}
            className="my-2.5 flex items-center gap-3 px-3 py-2.5"
          >
            <p>{t('navbar.login')}</p>
          </Link>
        </LogClick>
      )}
      <Sidebar />
      <div className="h-25" />
    </aside>
  );
};
