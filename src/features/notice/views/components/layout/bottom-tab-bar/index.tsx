import { Link, useLocation, useRouter } from '@tanstack/react-router';

import {
  HouseIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';
import { Category } from '@/features/notice/viewmodels';

import { ProfileModalButton } from '../../modals/profile-modal';

const tabClass =
  'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors';

const categoryPaths = new Set(
  Object.values(Category).map((c) => `/${c.toLowerCase()}`),
);

export function BottomTabBar() {
  const { t } = useTranslation('notice');
  const { t: tLayout } = useTranslation('layout');
  const { pathname } = useLocation();
  const router = useRouter();
  const { data: user } = useUser();

  const isHome = pathname === '/home' || categoryPaths.has(pathname);
  const isSearch = pathname.startsWith('/search');
  const isWrite = pathname.startsWith('/write');

  return (
    <nav
      className="border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark fixed inset-x-0 bottom-0 z-40 border-t bg-white pb-[calc(env(safe-area-inset-bottom)+1px)] md:hidden"
      aria-label="Primary"
    >
      <div className="flex h-14 items-stretch">
        <LogClick
          eventName={LogEvents.sidebarClickLink}
          properties={{ key: 'home' }}
        >
          <Link
            to="/home"
            className={cn(
              tabClass,
              isHome ? 'text-primary' : 'text-greyDark dark:text-dark_grey',
            )}
          >
            <HouseIcon
              className="size-6"
              weight={isHome ? 'fill' : 'regular'}
            />
            <span>{t('sidebar.home')}</span>
          </Link>
        </LogClick>

        <LogClick
          eventName={LogEvents.sidebarClickLink}
          properties={{ key: 'search' }}
        >
          <Link
            to="/search"
            className={cn(
              tabClass,
              isSearch ? 'text-primary' : 'text-greyDark dark:text-dark_grey',
            )}
          >
            <MagnifyingGlassIcon
              className="size-6"
              weight={isSearch ? 'bold' : 'regular'}
            />
            <span>{t('sidebar.search')}</span>
          </Link>
        </LogClick>

        <LogClick
          eventName={LogEvents.sidebarClickLink}
          properties={{ key: 'write' }}
        >
          <Link
            to="/write"
            className={cn(
              tabClass,
              isWrite ? 'text-primary' : 'text-greyDark dark:text-dark_grey',
            )}
          >
            <PencilSimpleIcon
              className="size-6"
              weight={isWrite ? 'fill' : 'regular'}
            />
            <span>{t('tabs.write')}</span>
          </Link>
        </LogClick>

        {user ? (
          <ProfileModalButton
            eventName={LogEvents.navBarClickMyPage}
            triggerClassName={cn(
              tabClass,
              'text-greyDark dark:text-dark_grey cursor-pointer',
            )}
            imageClassName="size-6 rounded-full"
            showName={false}
          >
            <span>{t('tabs.profile')}</span>
          </ProfileModalButton>
        ) : (
          <LogClick eventName={LogEvents.sidebarClickProfile}>
            <button
              type="button"
              className={cn(tabClass, 'text-greyDark dark:text-dark_grey')}
              onClick={() => router.navigate({ to: '/' })}
            >
              <UserIcon className="size-6" />
              <span>{tLayout('navbar.login')}</span>
            </button>
          </LogClick>
        )}
      </div>
    </nav>
  );
}
