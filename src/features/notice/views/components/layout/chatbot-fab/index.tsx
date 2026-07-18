import { useEffect, useState } from 'react';

import { StarFourIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

/** Secondary FAB — brand soft surface + primary accent (Button outlined) */
export function ChatbotFab({ onActivate }: { onActivate?: () => void }) {
  const { t } = useTranslation('layout');
  const [chatOpen, setChatOpen] = useState(false);
  const [ready, setReady] = useState(
    () => window.ChatbotWidget?.isReady?.() === true,
  );

  useEffect(() => {
    const w = window.ChatbotWidget;
    if (!w?.on) return;

    if (w.isReady?.()) setReady(true);

    const unsubReady = w.on('onReady', () => setReady(true));
    const unsubOpen = w.on('onOpen', () => setChatOpen(true));
    const unsubClose = w.on('onClose', () => setChatOpen(false));

    return () => {
      unsubReady?.();
      unsubOpen?.();
      unsubClose?.();
    };
  }, []);

  const handleClick = () => {
    const w = window.ChatbotWidget;
    if (!w) return;
    if (w.isOpen?.()) w.close?.();
    else w.open?.();
    onActivate?.();
  };

  return (
    <button
      type="button"
      aria-label={t('fab.chatbot')}
      aria-pressed={chatOpen}
      disabled={!ready}
      onClick={handleClick}
      className={cn(
        'border-primary bg-secondary text-primary flex size-12 items-center justify-center rounded-2xl border shadow-lg transition',
        'hover:bg-primary hover:text-on-primary active:scale-95',
        chatOpen && 'bg-primary text-on-primary',
        !ready && 'cursor-not-allowed opacity-50',
      )}
    >
      <StarFourIcon className="size-6" weight={chatOpen ? 'fill' : 'bold'} />
    </button>
  );
}
