import type { ReactNode } from 'react';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { Button } from '../button';

import { Dialog } from './index';

export interface ChooseDialogOptions {
  title?: ReactNode;
  description: ReactNode;
  confirmLabel?: ReactNode;
  denyLabel: ReactNode;
}

export type ChooseDialogResult =
  | { outcome: 'confirmed' }
  | { outcome: 'denied' }
  | { outcome: 'dismissed' };

interface ChooseDialogContentProps extends ChooseDialogOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onDeny: () => void;
  onDismiss: () => void;
  onExitComplete: () => void;
}

const ChooseDialogContent = ({
  isOpen,
  title,
  description,
  confirmLabel,
  denyLabel,
  onConfirm,
  onDeny,
  onDismiss,
  onExitComplete,
}: ChooseDialogContentProps) => {
  const { t } = useTranslation('common');
  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onDismiss}
      onExitComplete={onExitComplete}
      size="sm"
    >
      {title && (
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
      )}
      <Dialog.Body>
        <p className="whitespace-pre-line">{description}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <Button variant="muted" onClick={onDeny} className="flex-1">
          {denyLabel}
        </Button>
        <Button variant="contained" onClick={onConfirm} className="flex-1">
          {confirmLabel ?? t('alert_response.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};

export const chooseDialog = (
  opts: ChooseDialogOptions,
): Promise<ChooseDialogResult> =>
  overlay.openAsync<ChooseDialogResult>(({ isOpen, close, unmount }) => (
    <ChooseDialogContent
      {...opts}
      isOpen={isOpen}
      onConfirm={() => close({ outcome: 'confirmed' })}
      onDeny={() => close({ outcome: 'denied' })}
      onDismiss={() => close({ outcome: 'dismissed' })}
      onExitComplete={unmount}
    />
  ));
