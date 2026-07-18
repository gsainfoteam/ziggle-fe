import { XIcon } from '@phosphor-icons/react';
import { cn } from '@/common/utils';

import { useDrawerContext } from './context';

interface DrawerCloseProps {
  className?: string;
}

export const DrawerClose = ({ className }: DrawerCloseProps) => {
  const { onClose } = useDrawerContext();
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        'absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md',
        'text-muted-foreground hover:bg-muted transition-colors',
        className,
      )}
    >
      <XIcon className="size-5" />
    </button>
  );
};
