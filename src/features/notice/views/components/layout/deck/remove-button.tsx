import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { useDeck } from '../../../../viewmodels';

export function PanelRemoveButton({ panelKey }: { panelKey: string }) {
  const { t } = useTranslation('notice');
  const unpin = useDeck((s) => s.unpin);

  return (
    <button
      type="button"
      aria-label={t('list.unpin')}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() => unpin(panelKey)}
      className="text-muted-foreground hover:text-foreground flex size-7 shrink-0 items-center justify-center"
    >
      <XIcon className="size-5" />
    </button>
  );
}
