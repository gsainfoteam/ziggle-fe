import { type ReactNode, useState } from 'react';

import { Link, useLocation } from '@tanstack/react-router';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogoOnly from '@/assets/logos/ziggle-logo-only.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { AppBanner, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { Category } from '@/features/notice/viewmodels';

import { BottomTabBar } from '../bottom-tab-bar';
import { CategoryChips } from '../category-chips';
import { Navbar } from '../navbar';
import { Sidebar } from '../sidebar';
import { WriteFab } from '../write-fab';

const categoryPaths = new Set(
  Object.values(Category).map((c) => `/${c.toLowerCase()}`),
);

function showCategoryChips(pathname: string) {
  return pathname === '/home' || categoryPaths.has(pathname);
}

export function NoticeShell({ children }: { children: ReactNode }) {
  const [deckScrolled, setDeckScrolled] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div className="relative min-h-screen">
        <div className="dark:bg-dark_dark sticky top-0 z-50 bg-white pt-[env(safe-area-inset-top)] md:hidden">
          <AppBanner />
          <Navbar />
          {showCategoryChips(pathname) ? (
            <div className="relative">
              <CategoryChips />
              {/* 스크롤 콘텐츠가 칩 뒤로 지나갈 때 딱딱 잘리지 않게 */}
              <div
                aria-hidden
                className="dark:from-dark_dark pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b from-white to-transparent"
              />
            </div>
          ) : null}
        </div>

        <div className="flex md:h-screen md:overflow-hidden">
          <div className="relative hidden shrink-0 md:block md:w-16 xl:w-48">
            <aside
              className={cn(
                'group/sb dark:bg-dark_dark absolute inset-y-0 left-0 z-40 flex h-screen w-16 flex-col gap-y-8 overflow-x-hidden overflow-y-auto bg-white px-3 py-6.5 transition-all duration-200',
                'hover:w-48',
                'xl:static xl:w-48',
                'border-r border-r-transparent',
                'max-xl:hover:border-r-greyBorder dark:max-xl:hover:border-r-dark_greyBorder',
                deckScrolled &&
                  'border-r-greyBorder dark:border-r-dark_greyBorder',
              )}
            >
              <LogClick eventName={LogEvents.navBarClickLogo}>
                <Link to="/" className="flex h-8 items-center pl-1.5">
                  <ZiggleLogoOnly className="h-8 shrink-0 group-hover/sb:hidden xl:hidden" />
                  <span className="hidden group-hover/sb:block xl:block">
                    <ZiggleLogo className="h-8 overflow-visible dark:hidden" />
                    <ZiggleLogoDark className="hidden h-8 overflow-visible dark:block" />
                  </span>
                </Link>
              </LogClick>
              <Sidebar collapsible />
            </aside>
          </div>

          <div
            className="min-w-0 flex-1 overflow-x-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:overflow-x-auto md:pb-0"
            onScroll={(e) => setDeckScrolled(e.currentTarget.scrollLeft > 0)}
          >
            <div className="flex w-full min-w-0 md:w-max md:min-w-full md:justify-center md:gap-5 md:px-5 md:py-6.5">
              {children}
            </div>
          </div>
        </div>

        <BottomTabBar />
      </div>

      <WriteFab />
    </>
  );
}
