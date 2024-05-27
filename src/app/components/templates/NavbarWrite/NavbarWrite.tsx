'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/atoms/Analytics';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AccountIcon from '@/assets/icons/account.svg';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg';
import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import Button from '../../atoms/Button';

export interface User {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
}

const Navbar = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  const { data: user } = useSession();

  return (
    <header className="flex w-full items-center justify-between bg-white py-3 pl-2 pr-1 text-text md:px-4 md:py-2 dark:bg-text">
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
        <div className="mr-[10px] flex h-full flex-row-reverse items-center md:mr-[20px] md:w-full">
          <Link href={`/${lng}`}>
            <Button variant="outlined">{t('navbarWrite.goBack')}</Button>
          </Link>
        </div>
      </div>
      <Analytics
        event={user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin}
      >
        <Link
          href={user ? `/mypage` : `/login`}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="whitespace-nowrap align-middle font-medium text-primary">
            {user?.user.name ?? t('navbar.login')}
          </div>
        </Link>
      </Analytics>
    </header>
  );
};

export default Navbar;
