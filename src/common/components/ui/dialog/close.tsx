import CloseIcon from '@/assets/icons/close.svg?react';
import { cn } from '@/common/utils';

import { useDialogContext } from './context';

interface DialogCloseProps {
  className?: string;
}

export const DialogClose = ({ className }: DialogCloseProps) => {
  const { onClose } = useDialogContext();
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        'absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md',
        'text-greyDark dark:text-dark_grey hover:bg-greyLight dark:hover:bg-dark_greyDark transition-colors',
        className,
      )}
    >
      <CloseIcon className="stroke-greyDark dark:stroke-dark_grey h-5 w-5" />
    </button>
  );
};
