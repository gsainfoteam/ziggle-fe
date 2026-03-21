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
      <div className="flex h-95 w-80 rounded-2xl bg-white md:h-145 md:w-233.5 md:pl-6">
        <LandingGrids />
        <div className="flex w-full flex-col items-center justify-between p-4 md:w-96 md:p-6">
          <div className="flex h-110 w-fit flex-col items-center justify-center">
            <div className="mb-5 inline-block dark:hidden">
              <ZiggleLogo className="w-50 md:w-55" />
            </div>
            <div className="mb-5 hidden dark:inline-block">
              <ZiggleLogoDark className="w-50 md:w-55"/>
            </div>
            <div className="text-center text-lg font-bold">
              {t('home.subtitle')}
            </div>
          </div>
          <div className="flex h-fit w-full flex-col items-center gap-3">
            <p className="text-muted-foreground text-sm">
              <Trans
                t={t}
                i18nKey="home.policy"
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
              className="w-full px-5 py-2.5 md:w-80"
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
