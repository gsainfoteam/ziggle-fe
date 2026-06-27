import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { AppBanner, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import { Navbar } from '../navbar';
import { MobileShell, Sidebar } from '../sidebar';
import { WriteFab } from '../write-fab';

// 공지 영역 공통 셸: 모바일 상단바 + 데스크탑 사이드바 + 컬럼 영역 + FAB.
// 데스크탑은 페이지 스크롤 없이 컬럼이 각자 독립 스크롤(Threads식)한다.
// 멀티컬럼은 컬럼 영역에 <Column>을 더 나열하면 된다(현재는 1개 = Outlet).
export function NoticeShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileShell>
        {/* 모바일 전용 상단바 */}
        <div className="sticky top-0 z-50 md:hidden">
          <AppBanner />
          <Navbar />
        </div>

        {/* 데스크탑: 뷰포트 높이 고정 + 페이지 스크롤 차단 / 모바일: auto 높이(페이지 스크롤) */}
        <div className="flex md:h-screen md:overflow-hidden">
          {/* 데스크탑 사이드바 (로고 + 네비) */}
          <aside className="dark:bg-dark_dark sticky top-0 hidden h-screen w-48 shrink-0 flex-col gap-y-6 overflow-y-auto bg-white px-4 py-6.5 md:flex">
            <LogClick eventName={LogEvents.navBarClickLogo}>
              <Link to="/" className="ml-2.5">
                <ZiggleLogo className="h-8 overflow-visible dark:hidden" />
                <ZiggleLogoDark className="hidden h-8 overflow-visible dark:block" />
              </Link>
            </LogClick>
            <Sidebar />
          </aside>

          {/* 컬럼 영역: 거터는 사이드바와 같은 bg(투명). 각 프레임이 <Column>을 렌더한다.
              1개면 중앙, 넘치면 가로 스크롤. */}
          <div className="flex-1 md:overflow-x-auto">
            <div className="flex md:w-max md:min-w-full md:justify-center md:gap-4 md:px-4">
              {children}
            </div>
          </div>
        </div>
      </MobileShell>

      <WriteFab />
    </>
  );
}
