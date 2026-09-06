import { Link } from '@tanstack/react-router';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

/** Primary FAB — solid brand fill */
export const WriteFab = ({ onActivate }: { onActivate?: () => void }) => {
  const { t } = useTranslation('notice');

  return (
    <LogClick
      eventName={LogEvents.sidebarClickLink}
      properties={{ key: 'write' }}
    >
      <Link
        to="/write"
        aria-label={t('sidebar.write')}
        onClick={onActivate}
        className="bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active flex size-12 items-center justify-center rounded-2xl shadow-lg transition active:scale-95"
      >
        <PencilSimpleIcon weight="fill" className="size-6" />
      </Link>
    </LogClick>
  );
};
