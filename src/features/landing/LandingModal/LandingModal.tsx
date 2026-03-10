import { Button } from '@/common/components';
import { useTranslation } from 'react-i18next';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { useAuth, useAuthRedirect } from '@/features/auth';
import { useSearch } from '@tanstack/react-router';

import IrregularGrids from './IrregularGrids';
export default function LandingModal() {
  const { t } = useTranslation('home');

  const search = useSearch({ strict: false });
  const redirect = search.redirect;
  const { idpLogIn } = useAuth();

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex h-145 w-233.5 rounded-2xl bg-white px-4 shadow-xl">
        <IrregularGrids />
        <div className="flex w-96 flex-col justify-between p-6">
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
              className="w-80"
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
    </div>
  );
}
