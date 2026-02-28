import { useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button } from '@/common/components';
import { useAuth, useAuthRedirect } from '@/features/auth';

export function LandingFrame() {
  const { t } = useTranslation('home');
  const { redirect } = useSearch({ from: '/_auth' });
  const { idpLogIn } = useAuth();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-8">
      <div className="block dark:hidden">
        <ZiggleLogo className="h-20" />
      </div>
      <div className="hidden dark:block">
        <ZiggleLogoDark className="h-20" />
      </div>
      <p className="text-xl font-semibold md:text-2xl">{t('home.subtitle')}</p>
      <Button
        variant="outlined"
        onClick={() => {
          useAuthRedirect.getState().setRedirect(redirect ?? '/home');
          idpLogIn();
        }}
      >
        {t('home.login')}
      </Button>
    </div>
  );
}
