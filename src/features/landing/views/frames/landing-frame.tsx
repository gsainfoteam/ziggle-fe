import { useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button } from '@/common/components';

export function LandingFrame() {
  const { t } = useTranslation('home');
  const router = useRouter();
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
        onClick={() => router.navigate({ to: '/auth/login' })}
      >
        {t('home.login')}
      </Button>
    </div>
  );
}
