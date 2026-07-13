import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

// 데스크탑 전용 FAB. 모바일은 하단 탭의 작성으로 대체한다.
// 지스트 챗봇(우하단 고정 위젯) 바로 위에 스택되도록 offset 한다.
export const WriteFab = () => {
  const { t } = useTranslation('notice');

  return (
    <LogClick
      eventName={LogEvents.sidebarClickLink}
      properties={{ key: 'write' }}
    >
      <Link
        to="/write"
        aria-label={t('sidebar.write')}
        className="bg-primary fixed right-[18px] bottom-24 z-40 hidden size-14 items-center justify-center rounded-full shadow-lg transition hover:brightness-95 active:scale-95 md:flex"
      >
        <PencilSimpleIcon className="size-6 text-white" />
      </Link>
    </LogClick>
  );
};
