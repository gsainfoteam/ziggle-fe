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
    <div className="flex h-145 w-233 rounded-2xl px-2.5">
      <div></div>
      <div className="flex w-[384px] flex-col px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <div className="block dark:hidden">
            <ZiggleLogo className="h-20" />
          </div>
          <div className="hidden dark:block">
            <ZiggleLogoDark className="h-20" />
          </div>
          <div>{t('home.subtitle')}</div>
        </div>
        <div className="flex h-fit flex-col items-center">
          <p>개인정보처리방침 및 이용약관</p>
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
