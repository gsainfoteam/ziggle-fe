import type { ReactNode } from 'react';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { Button } from '../button';

import { Dialog } from './index';

export interface AlertDialogOptions {
  title: ReactNode;
  description: ReactNode;
  confirmLabel?: ReactNode;
}

interface AlertDialogContentProps extends AlertDialogOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onExitComplete: () => void;
}

const AlertDialogContent = ({
  isOpen,
  title,
  description,
  confirmLabel,
  onConfirm,
  onExitComplete,
}: AlertDialogContentProps) => {
  const { t } = useTranslation('common');
  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onConfirm}
      onExitComplete={onExitComplete}
      size="xs"
      className="gap-5"
    >
      <Dialog.Header>
        <Dialog.Title className="text-lg text-pretty">{title}</Dialog.Title>
        <Dialog.Description className="text-pretty whitespace-pre-line">
          {description}
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Button variant="contained" onClick={onConfirm} className="flex-1">
          {confirmLabel ?? t('alert_response.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};

export const alertDialog = (opts: AlertDialogOptions): Promise<void> =>
  overlay.openAsync<void>(({ isOpen, close, unmount }) => (
    <AlertDialogContent
      {...opts}
      isOpen={isOpen}
      onConfirm={() => close()}
      onExitComplete={unmount}
    />
  ));
