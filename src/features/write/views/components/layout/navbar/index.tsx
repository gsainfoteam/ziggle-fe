import { Link } from '@tanstack/react-router';

import { CaretLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

/** 모바일 작성 헤더 — 홈 Navbar와 동일 패딩·safe-area, 컴팩트 뒤로가기 */
export const NavbarWrite = () => {
  const { t } = useTranslation('layout');

  return (
    <div className="bg-background sticky top-0 z-50 pt-[env(safe-area-inset-top)] md:hidden">
      <header className="text-foreground flex w-full items-center justify-between p-5">
        <LogClick eventName={LogEvents.navBarClickLogo}>
          <Link to="/home" className="flex shrink-0 items-center">
            <ZiggleLogo variant="compact" className="h-8 overflow-visible" />
          </Link>
        </LogClick>
        <Link
          to="/home"
          className="text-muted-foreground hover:text-foreground flex h-8 items-center gap-0.5 text-sm font-medium transition"
        >
          <CaretLeftIcon className="size-4" weight="bold" aria-hidden />
          {t('navbar_write.go_back')}
        </Link>
      </header>
    </div>
  );
};
