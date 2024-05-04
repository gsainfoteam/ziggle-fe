'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { auth } from '@/api/auth/auth';
import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AccountIcon from '@/assets/icons/account.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg';

import Button from '../../atoms/Button';
import SearchBar from '../../molecules/searchBar/SearchBar';
import SidebarMobile from '../Sidebar/SidebarMobile';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  studentId: string;
}

const Navbar = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await auth();
      setUser(user);
    };

    fetchUser();
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="flex w-full items-center justify-between bg-white py-3 pl-2 pr-1 text-text md:px-4 md:py-2">
      <div className="relative flex h-full w-full items-center justify-between">
        <Analytics event={LogEvents.navBarClickLogo}>
          <Link href={`/${lng}`}>
            <ZiggleLogo className="hidden h-8 overflow-visible md:flex" />
            <ZiggleCompactLogo className="h-8 overflow-visible md:hidden" />
          </Link>
        </Analytics>
        <div className="flex h-full items-center md:w-full">
          <SearchBar lng={lng} />
          <Button
            onClick={handleSidebarOpen}
            className="flex h-full w-12 items-center justify-center overflow-clip rounded-md md:hidden md:h-full"
          >
            <MenuIcon className="h-6 stroke-text md:hidden" />
          </Button>
        </div>
      </div>
      <Analytics
        event={user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin}
      >
        <Link
          href={user ? `${lng}/mypage` : `${lng}/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user ? user.name : t('navbar.login')}
          </div>
        </Link>
      </Analytics>

      {isSidebarOpen && (
        <div className="md:hidden">
          <SidebarMobile lng={lng} onClose={handleSidebarClose} user={user} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
