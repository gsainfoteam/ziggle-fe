import { useSearch } from '@tanstack/react-router';

import { Trans, useTranslation } from 'react-i18next';

import { Button, Dialog, ZiggleLogo } from '@/common/components';

import { LandingGrids } from './landing-grids';
import {
  useAuth,
  useAuthPrompt,
  useAuthRedirect,
  useToken,
} from '../../viewmodels';

export function LoginModal() {
  const { t } = useTranslation('home');
  const search = useSearch({ strict: false });
  const { idpLogIn } = useAuth();
  const { token } = useToken();
  const requiredConsents = useAuthPrompt((state) => state.requiredConsents);

  return (
    <Dialog.Root
      isOpen={!token && !requiredConsents}
      onClose={() => {}}
      closeOnBackdrop={false}
      closeOnEscape={false}
      size="lg"
      className="max-h-none w-auto max-w-none border-none p-0 shadow-none"
    >
      <div className="bg-background flex h-95 w-80 overflow-hidden rounded-2xl md:h-145 md:w-233.5 md:pl-6">
        <LandingGrids />
        <div className="flex w-full flex-col items-center justify-between p-4 md:w-96 md:p-6">
          <div className="flex h-110 w-fit flex-col items-center justify-center">
            <ZiggleLogo variant="full" className="mb-5 h-14 md:h-15" />
            <div className="text-center text-lg font-bold">
              {t('home.subtitle')}
            </div>
          </div>
          <div className="flex h-fit w-full flex-col items-center gap-3">
            <p className="text-subtle text-sm">
              <Trans
                t={t}
                i18nKey="home.policy"
                components={{
                  privacyLink: (
                    <a
                      href="https://terms.gistory.me/ziggle/privacy/250302/"
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      className="font-semibold hover:underline focus:outline-none"
                    />
                  ),
                  termsLink: (
                    <a
                      href="https://terms.gistory.me/ziggle/tos/250302/"
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      className="font-semibold hover:underline focus:outline-none"
                    />
                  ),
                }}
              />
            </p>
            <Button
              className="w-full px-5 py-2.5 md:w-80"
              variant="outlined"
              onClick={() => {
                useAuthRedirect
                  .getState()
                  .setRedirect(search.redirect ?? '/home');
                idpLogIn();
              }}
            >
              {t('home.login')}
            </Button>
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
}
