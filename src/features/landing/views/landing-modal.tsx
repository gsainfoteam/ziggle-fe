import { useState } from 'react';

import { useSearch } from '@tanstack/react-router';

import { ChevronLeft } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { Button, Dialog } from '@/common/components';
import {
  ConsentFrame,
  useAuth,
  useAuthPrompt,
  useAuthRedirect,
} from '@/features/auth';

import LandingGrids from './components/landing-grids';

type TermsView = { type: 'privacy' | 'tos'; version: string };

export function LandingModal() {
  const { t } = useTranslation('home');
  const { t: tAuth } = useTranslation('auth');

  const search = useSearch({ strict: false });
  const redirect = search.redirect;
  const { idpLogIn } = useAuth();

  const requiredConsents = useAuthPrompt((state) => state.requiredConsents);
  const [termsOpen, setTermsOpen] = useState<TermsView | null>(null);

  const isLogin = !requiredConsents;
  const isConsent = !!requiredConsents && !termsOpen;
  const isTerms = !!requiredConsents && !!termsOpen;

  const termsTitle: Record<string, string> = {
    privacy: tAuth('consent.termsTitle.privacy'),
    tos: tAuth('consent.termsTitle.tos'),
  };

  return (
    <>
      <Dialog.Root
        isOpen={isLogin}
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
              <div className="mb-5 inline-block dark:hidden">
                <ZiggleLogo className="w-50 md:w-55" />
              </div>
              <div className="mb-5 hidden dark:inline-block">
                <ZiggleLogoDark className="w-50 md:w-55" />
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
      </Dialog.Root>

      <Dialog.Root
        isOpen={isConsent}
        onClose={() => {}}
        closeOnBackdrop={false}
        closeOnEscape={false}
        size="sm"
      >
        <ConsentFrame
          onTermsClick={(type, version) => setTermsOpen({ type, version })}
        />
      </Dialog.Root>

      <Dialog.Root
        isOpen={isTerms}
        onClose={() => setTermsOpen(null)}
        size="lg"
      >
        {termsOpen && (
          <>
            <Dialog.Header className="flex-row items-center gap-3 pr-0">
              <button
                type="button"
                onClick={() => setTermsOpen(null)}
                className="text-greyDark hover:bg-greyLight shrink-0 rounded-md p-1 transition-colors"
                aria-label={tAuth('consent.back')}
              >
                <ChevronLeft size={20} />
              </button>
              <Dialog.Title>{termsTitle[termsOpen.type]}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <iframe
                src={`https://terms.gistory.me/embedded/ziggle/${termsOpen.type}/${termsOpen.version}/`}
                title={termsTitle[termsOpen.type]}
                className="h-96 w-full rounded-xl"
              />
            </Dialog.Body>
          </>
        )}
      </Dialog.Root>
    </>
  );
}
