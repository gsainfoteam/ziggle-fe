'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Suspense, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AccountIcon from '@/assets/icons/account.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg';
import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import Button from '../../shared/Button';
import SidebarMobile from '../Sidebar/SidebarMobile';
import SearchBar from './SearchBar';

const Navbar = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  const { data: user } = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-white py-3 pl-2 pr-1 text-text dark:bg-dark_dark md:px-4 md:py-2">
      <div className="relative flex h-full w-full items-center justify-between">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <div className="block dark:hidden">
              <ZiggleLogo className="hidden h-8 overflow-visible md:flex" />
              <ZiggleCompactLogo className="h-8 overflow-visible md:hidden" />
            </div>
            <div className="hidden dark:block">
              <ZiggleLogoDark className="hidden h-8 overflow-visible md:flex" />
              <ZiggleCompactLogoDark className="h-8 overflow-visible md:hidden" />
            </div>
          </Link>
        </Analytics>
        <div className="flex h-full items-center md:w-full">
          <Suspense>
            <SearchBar lng={lng} />
          </Suspense>
          <Analytics event={LogEvents.navBarClickMenu}>
            <Button
              onClick={handleSidebarOpen}
              className="flex h-full w-12 items-center justify-center overflow-clip rounded-md md:hidden"
            >
              <MenuIcon className="h-6 stroke-text dark:stroke-dark_white md:hidden" />
            </Button>
          </Analytics>
        </div>
      </div>
      <Analytics
        event={user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin}
      >
        <Link
          href={user ? `/${lng}/mypage` : `/${lng}/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user?.user?.name ?? t('navbar.login')}
          </div>
        </Link>
      </Analytics>

      {isSidebarOpen && (
        <div className="md:hidden">
          <SidebarMobile
            lng={lng}
            onClose={handleSidebarClose}
            user={user?.user ?? null}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
