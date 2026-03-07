import { Button } from '@/common/components';
import { useTranslation } from 'react-i18next';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { useAuth, useAuthRedirect } from '@/features/auth';
import { useSearch } from '@tanstack/react-router';
export default function LandingModal() {
  const { t } = useTranslation('home');
  const { redirect } = useSearch({ from: '/_auth' });
  const { idpLogIn } = useAuth();

  return (
    <div className="flex h-145 w-233.5 rounded-2xl px-2.5">
      <div></div>
      <div className="flex w-96 flex-col justify-between px-4 py-2">
        <div className="flex h-110 flex-col items-center justify-center">
          <div className="mb-5 block dark:hidden">
            <ZiggleLogo className="w-55" />
          </div>
          <div className="mb-5 hidden dark:block">
            <ZiggleLogoDark className="w-55" />
          </div>
          <div className="text-lg font-bold">{t('home.subtitle')}</div>
        </div>
        <div className="flex h-fit flex-col items-center gap-3">
          <p className="font-xs text-greyDark font-medium">
            {t('home.policy')}
          </p>
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
      </div>
    </div>
  );
}
