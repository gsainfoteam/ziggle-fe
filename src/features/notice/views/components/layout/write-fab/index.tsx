import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

// 우하단 고정 FAB. 지스트 챗봇(우하단 고정 위젯) 바로 위에 스택되도록 offset 한다.
// transform 조상이 있으면 fixed 기준이 바뀌므로, MobileShell 바깥(형제)에 렌더해야 한다.
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
        className="bg-primary fixed right-[18px] bottom-24 z-40 flex size-14 items-center justify-center rounded-full shadow-lg transition hover:brightness-95 active:scale-95"
      >
        <PencilSimpleIcon className="size-6 text-white" />
      </Link>
    </LogClick>
  );
};
