import { useSearch } from '@tanstack/react-router';

import { Trans, useTranslation } from 'react-i18next';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button } from '@/common/components';
import { useAuth, useAuthRedirect } from '@/features/auth';

import LandingGrids from './components/landing-grids';
export function LandingModal() {
  const { t } = useTranslation('home');

  const search = useSearch({ strict: false });
  const redirect = search.redirect;
  const { idpLogIn } = useAuth();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex h-145 w-233.5 rounded-2xl bg-white pl-6">
        <LandingGrids />
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
            <p className="text-muted-foreground text-sm">
              <Trans
                t={t}
                i18nKey={'home.policy'}
                components={{
                  privacyLink: (
                    <a
                      href="https://terms.gistory.me/ziggle/privacy/250302/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    />
                  ),
                  termsLink: (
                    <a
                      href="https://terms.gistory.me/ziggle/tos/250302/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    />
                  ),
                }}
              />
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
