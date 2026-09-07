import { StarFourIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { useChatbot } from '@/common/lib';
import { cn } from '@/common/utils';

export function ChatbotFab({ onActivate }: { onActivate?: () => void }) {
  const { t } = useTranslation('layout');
  const { isLoaded, isOpen, toggle } = useChatbot();

  const handleClick = () => {
    toggle();
    onActivate?.();
  };

  return (
    <button
      type="button"
      aria-label={t('fab.chatbot')}
      aria-expanded={isOpen}
      disabled={!isLoaded}
      onClick={handleClick}
      className={cn(
        'border-primary bg-secondary text-primary flex size-12 items-center justify-center rounded-2xl border shadow-lg transition',
        'hover:bg-primary hover:text-on-primary active:scale-95',
        isOpen && 'bg-primary text-on-primary',
        !isLoaded && 'cursor-not-allowed opacity-50',
      )}
    >
      <StarFourIcon className="size-6" weight={isOpen ? 'fill' : 'bold'} />
    </button>
  );
}
