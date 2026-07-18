import { type ReactNode, useState } from 'react';

import { Link, useLocation } from '@tanstack/react-router';

import TitleLong from '@/assets/logos/title-long.svg?react';
import { AppBanner, LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn, useIsDesktop } from '@/common/utils';
import { Category } from '@/features/notice/viewmodels';

import { BottomTabBar } from '../bottom-tab-bar';
import { CategoryChips } from '../category-chips';
import { FabStack } from '../fab-stack';
import { Navbar } from '../navbar';
import { Sidebar } from '../sidebar';

const categoryPaths = new Set(
  Object.values(Category).map((c) => `/${c.toLowerCase()}`),
);

function showCategoryChips(pathname: string) {
  return pathname === '/home' || categoryPaths.has(pathname);
}

export function NoticeShell({ children }: { children: ReactNode }) {
  const [deckScrolled, setDeckScrolled] = useState(false);
  const { pathname } = useLocation();
  const isDesktop = useIsDesktop();

  return (
    <>
      <div className="relative min-h-screen">
        {!isDesktop ? (
          <div className="bg-background sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
            <AppBanner />
            <Navbar />
            {showCategoryChips(pathname) ? (
              <div className="relative">
                <CategoryChips />
                <div
                  aria-hidden
                  className="from-background pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b to-transparent"
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex md:h-screen md:overflow-hidden">
          {isDesktop ? (
            <div className="relative shrink-0 md:w-16 xl:w-48">
              <aside
                className={cn(
                  'group/sb bg-background absolute inset-y-0 left-0 z-40 flex h-screen w-16 flex-col gap-y-8 overflow-x-hidden overflow-y-auto px-3 py-6.5 transition-all duration-200',
                  'hover:w-48',
                  'xl:static xl:w-48',
                  'border-r border-r-transparent',
                  'max-xl:hover:border-r-border',
                  deckScrolled && 'border-r-border',
                )}
              >
                <LogClick eventName={LogEvents.navBarClickLogo}>
                  <Link
                    to="/"
                    className="text-foreground flex h-8 items-center gap-3 px-2.5"
                  >
                    {/* size-5 아이콘 열과 중심만 맞추고, 불 마크는 h-8 유지 */}
                    <span className="flex size-5 shrink-0 items-center justify-center overflow-visible">
                      <ZiggleLogo
                        variant="mark"
                        className="h-8 overflow-visible"
                      />
                    </span>
                    <TitleLong
                      aria-hidden
                      className="hidden h-8 w-auto overflow-visible group-hover/sb:inline xl:inline"
                    />
                  </Link>
                </LogClick>
                <Sidebar collapsible />
              </aside>
            </div>
          ) : null}

          <div
            className="min-w-0 flex-1 overflow-x-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:overflow-x-auto md:pb-0"
            onScroll={(e) => setDeckScrolled(e.currentTarget.scrollLeft > 0)}
          >
            <div className="flex w-full min-w-0 md:w-max md:min-w-full md:justify-center md:gap-5 md:px-5 md:py-6.5">
              {children}
            </div>
          </div>
        </div>

        {!isDesktop ? <BottomTabBar /> : null}
      </div>

      <FabStack />
    </>
  );
}
