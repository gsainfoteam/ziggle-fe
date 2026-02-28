import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import AccountIcon from '@/assets/icons/account.svg?react';
import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg?react';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg?react';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useUser } from '@/features/auth';

export const NavbarWrite = () => {
  const { t } = useTranslation('layout');
  const { data: user } = useUser();

  return (
    <header className="text-text flex w-full items-center justify-between bg-white py-3 pr-1 pl-2 md:px-4 md:py-2">
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
        <div className="mr-[10px] flex h-full flex-row-reverse items-center md:mr-[20px] md:w-full">
          <Link to="/">
            <Button variant="outlined">{t('navbarWrite.goBack')}</Button>
          </Link>
        </div>
      </div>
      <LogClick
        eventName={
          user ? LogEvents.navBarClickMyPage : LogEvents.navBarClickLogin
        }
      >
        <Link
          to={user ? '/mypage' : '/'}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <AccountIcon className="flex h-6" />
          <div className="text-primary align-middle font-medium whitespace-nowrap">
            {user?.name ?? t('navbar.login')}
          </div>
        </Link>
      </LogClick>
    </header>
  );
};
