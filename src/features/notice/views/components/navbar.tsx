import { useState } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import AccountIcon from '@/assets/icons/account.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg?react';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg?react';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import SearchBar from './search-bar';
import SidebarMobile from './sidebar-mobile';

export const Navbar = () => {
  const { t } = useTranslation('layout');

  // TODO: get user, fix type
  const user = null as { user: { name: string } } | null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="text-text dark:bg-dark_dark sticky top-0 z-50 flex w-full items-center justify-between bg-white py-3 pr-1 pl-2 md:px-4 md:py-2">
      <div className="relative flex h-full w-full items-center justify-between">
        <LogClick eventName={LogEvents.navBarClickLogo}>
          <Link to="/">
            <div className="block dark:hidden">
              <ZiggleLogo className="hidden h-8 overflow-visible md:flex" />
              <ZiggleCompactLogo className="h-8 overflow-visible md:hidden" />
            </div>
            <div className="hidden dark:block">
              <ZiggleLogoDark className="hidden h-8 overflow-visible md:flex" />
              <ZiggleCompactLogoDark className="h-8 overflow-visible md:hidden" />
            </div>
          </Link>
        </LogClick>
        <div className="flex h-full items-center md:w-full">
          <SearchBar />
          <LogClick eventName={LogEvents.navBarClickMenu}>
            <Button
              onClick={handleSidebarOpen}
              className="flex h-full w-12 items-center justify-center overflow-clip rounded-md md:hidden"
            >
              <MenuIcon className="stroke-text dark:stroke-dark_white h-6 md:hidden" />
            </Button>
          </LogClick>
        </div>
      </div>
      <LogClick
        eventName={
          user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin
        }
      >
        <Link
          to={user ? `/mypage` : `/auth/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="text-primary align-middle font-medium whitespace-nowrap">
            {user?.user?.name ?? t('navbar.login')}
          </div>
        </Link>
      </LogClick>

      {isSidebarOpen && (
        <div className="md:hidden">
          <SidebarMobile
            onClose={handleSidebarClose}
            user={user?.user ?? null}
          />
        </div>
      )}
    </header>
  );
};
