import type { ReactNode } from 'react';

import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { Button } from '../button';
import { DialogDescription } from './description';
import { DialogFooter } from './footer';
import { DialogHeader } from './header';
import { DialogRoot } from './root';
import { DialogTitle } from './title';

export interface ConfirmDialogOptions {
  title: ReactNode;
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
    <DialogRoot
      isOpen={isOpen}
      onClose={onCancel}
      onExitComplete={onExitComplete}
      size="xs"
      className="gap-5"
    >
      <DialogHeader>
        <DialogTitle className="text-lg text-pretty">{title}</DialogTitle>
        <DialogDescription className="text-pretty whitespace-pre-line">
          {description}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="muted" onClick={onCancel} className="flex-1">
          {cancelLabel ?? t('alert_response.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          className={cn(
            'flex-1',
            destructive &&
              'text-on-primary bg-red-500 hover:bg-red-600 active:bg-red-700',
          )}
        >
          {confirmLabel ?? t('alert_response.confirm')}
        </Button>
      </DialogFooter>
    </DialogRoot>
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
