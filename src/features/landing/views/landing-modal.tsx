import { useSearch } from '@tanstack/react-router';

import { Trans, useTranslation } from 'react-i18next';

import { Button, Dialog, ZiggleLogo } from '@/common/components';
import { useAuth, useAuthRedirect } from '@/features/auth';

import LandingGrids from './components/landing-grids';

export function LandingModal() {
  const { t } = useTranslation('home');

  const search = useSearch({ strict: false });
  const redirect = search.redirect;
  const { idpLogIn } = useAuth();

  return (
    <Dialog.Root
      isOpen
      onClose={() => {}}
      closeOnBackdrop={false}
      closeOnEscape={false}
      size="lg"
      className="max-h-none w-auto max-w-none border-none p-0 shadow-none"
    >
      <div className="flex h-95 w-80 overflow-hidden rounded-2xl bg-white md:h-145 md:w-233.5 md:pl-6">
        <LandingGrids />
        <div className="flex w-full flex-col items-center justify-between p-4 md:w-96 md:p-6">
          <div className="flex h-110 w-fit flex-col items-center justify-center">
            {/* 모달이 항상 흰 배경이라 다크모드여도 타이틀은 짙은 색 유지 */}
            <ZiggleLogo
              variant="full"
              className="text-dark_dark mb-5 h-14 md:h-15"
            />
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
    </Dialog.Root>
  );
}
