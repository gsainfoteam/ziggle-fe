import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { UserIcon } from '@phosphor-icons/react';
import { Avatar, Button, LogClick, ZiggleLogo } from '@/common/components';
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
            <ZiggleLogo
              variant="full"
              className="hidden h-8 overflow-visible md:inline-flex"
            />
            <ZiggleLogo
              variant="compact"
              className="h-8 overflow-visible md:hidden"
            />
          </Link>
        </LogClick>
        <div className="mr-2.5 flex h-full flex-row-reverse items-center md:mr-5 md:w-full">
          <Link to="/">
            <Button variant="outlined">{t('navbar_write.go_back')}</Button>
          </Link>
        </div>
      </div>
      {user ? (
        <Avatar
          name={user.name}
          picture={user.picture}
          imageClassName="h-6 w-6"
          className="hidden gap-2 md:flex"
        />
      ) : (
        <LogClick eventName={LogEvents.navBarClickLogin}>
          <Link
            to="/"
            className="hidden items-center justify-center gap-2 md:flex"
          >
            <UserIcon className="size-6" />
            <div className="text-primary align-middle font-medium whitespace-nowrap">
              {t('navbar.login')}
            </div>
          </Link>
        </LogClick>
      )}
    </header>
  );
};
