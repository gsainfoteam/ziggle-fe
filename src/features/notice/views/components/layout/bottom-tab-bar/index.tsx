import { useState } from 'react';

import { Link, useLocation, useRouter } from '@tanstack/react-router';

import {
  BookmarkSimpleIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';
import { Category } from '@/features/notice/viewmodels';

import { ProfileModalButton } from '../../modals/profile-modal';

const tabClass = cn(
  'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
);

const categoryPaths = new Set(
  Object.values(Category).map((c) => `/${c.toLowerCase()}`),
);

export function BottomTabBar() {
  const { t } = useTranslation('notice');
  const { t: tLayout } = useTranslation('layout');
  const { pathname } = useLocation();
  const router = useRouter();
  const { data: user } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);

  const isHome = pathname === '/home' || categoryPaths.has(pathname);
  const isSearch = pathname.startsWith('/search');
  const isBookmark = pathname.startsWith('/bookmarked');

  return (
    <nav
      className="border-border bg-background fixed inset-x-0 bottom-0 z-40 border-t pb-[calc(env(safe-area-inset-bottom)+1px)] md:hidden"
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
              isHome && !profileOpen ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <HouseIcon
              className="size-6"
              weight={isHome && !profileOpen ? 'fill' : 'regular'}
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
              isSearch && !profileOpen
                ? 'text-primary'
                : 'text-muted-foreground',
            )}
          >
            <MagnifyingGlassIcon
              className="size-6"
              weight={isSearch && !profileOpen ? 'bold' : 'regular'}
            />
            <span>{t('sidebar.search')}</span>
          </Link>
        </LogClick>

        <LogClick
          eventName={LogEvents.sidebarClickLink}
          properties={{ key: 'bookmarked' }}
        >
          <Link
            to="/bookmarked"
            className={cn(
              tabClass,
              isBookmark && !profileOpen
                ? 'text-primary'
                : 'text-muted-foreground',
            )}
          >
            <BookmarkSimpleIcon
              className="size-6"
              weight={isBookmark && !profileOpen ? 'fill' : 'regular'}
            />
            <span>{t('sidebar.bookmark_notice')}</span>
          </Link>
        </LogClick>

        {user ? (
          <ProfileModalButton
            eventName={LogEvents.navBarClickMyPage}
            onOpenChange={setProfileOpen}
            triggerClassName={cn(
              tabClass,
              'cursor-pointer',
              profileOpen ? 'text-primary' : 'text-muted-foreground',
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
              className={cn(tabClass, 'text-muted-foreground')}
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
