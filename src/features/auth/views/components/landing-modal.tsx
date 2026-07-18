import { useState } from 'react';

import { ConsentModal } from './consent-modal';
import { LoginModal } from './login-modal';
import { TermsModal } from './terms-modal';

type TermsView = { type: 'privacy' | 'tos'; version: string };

export function LandingModal() {
  const [termsOpen, setTermsOpen] = useState<TermsView | null>(null);

  return (
    <>
      <LoginModal />
      <ConsentModal
        onTermsClick={(type, version) => setTermsOpen({ type, version })}
      />
      <TermsModal termsOpen={termsOpen} onClose={() => setTermsOpen(null)} />
    </>
  );
}
