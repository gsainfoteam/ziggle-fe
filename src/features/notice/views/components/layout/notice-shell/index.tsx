import { type ReactNode, useState } from 'react';

import { useLocation } from '@tanstack/react-router';

import { AppBanner } from '@/common/components';
import { useIsDesktop } from '@/common/utils';
import { Category } from '@/features/notice/viewmodels';

import { BottomTabBar } from '../bottom-tab-bar';
import { CategoryChips } from '../category-chips';
import { FabStack } from '../fab-stack';
import { Navbar } from '../navbar';
import { SidebarRail } from '../sidebar';

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
          {isDesktop ? <SidebarRail scrolled={deckScrolled} /> : null}

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
