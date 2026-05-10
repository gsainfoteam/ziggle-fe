import { createContext, useContext } from 'react';

export interface DialogContextValue {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialogContext = (): DialogContextValue => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('Dialog subcomponents must be used inside <Dialog.Root>.');
  }
  return ctx;
};
