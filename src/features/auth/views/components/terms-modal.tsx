import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Dialog } from '@/common/components';

type TermsView = { type: 'privacy' | 'tos'; version: string };

interface TermsModalProps {
  termsOpen: TermsView | null;
  onClose: () => void;
}

export function TermsModal({ termsOpen, onClose }: TermsModalProps) {
  const { t } = useTranslation('auth');

  const termsTitle: Record<string, string> = {
    privacy: t('consent.termsTitle.privacy'),
    tos: t('consent.termsTitle.tos'),
  };

  return (
    <Dialog.Root isOpen={!!termsOpen} onClose={onClose} size="lg">
      {termsOpen && (
        <>
          <Dialog.Header className="flex-row items-center gap-3 pr-0">
            <button
              type="button"
              onClick={onClose}
              className="text-greyDark hover:bg-greyLight shrink-0 rounded-md p-1 transition-colors"
              aria-label={t('consent.back')}
            >
              <ChevronLeft size={20} />
            </button>
            <Dialog.Title>{termsTitle[termsOpen.type]}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="h-120">
            <iframe
              src={`https://terms.gistory.me/embedded/ziggle/${termsOpen.type}/${termsOpen.version}/`}
              title={termsTitle[termsOpen.type]}
              className="h-full w-full"
            />
          </Dialog.Body>
        </>
      )}
    </Dialog.Root>
  );
}
