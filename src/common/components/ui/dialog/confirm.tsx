import type { ReactNode } from 'react';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { Button } from '../button';

import { Dialog } from './index';

export interface ConfirmDialogOptions {
  title?: ReactNode;
  description: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  destructive?: boolean;
}

interface ConfirmDialogContentProps extends ConfirmDialogOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onExitComplete: () => void;
}

const ConfirmDialogContent = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive,
  onConfirm,
  onCancel,
  onExitComplete,
}: ConfirmDialogContentProps) => {
  const { t } = useTranslation('common');
  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onCancel}
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
        <Button variant="muted" onClick={onCancel} className="flex-1">
          {cancelLabel ?? t('alert_response.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          className={cn(
            'flex-1',
            destructive && 'text-on-primary bg-red-500 hover:brightness-90',
          )}
        >
          {confirmLabel ?? t('alert_response.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
};

export const confirmDialog = (opts: ConfirmDialogOptions): Promise<boolean> =>
  overlay.openAsync<boolean>(({ isOpen, close, unmount }) => (
    <ConfirmDialogContent
      {...opts}
      isOpen={isOpen}
      onConfirm={() => close(true)}
      onCancel={() => close(false)}
      onExitComplete={unmount}
    />
  ));
