import { Loader2 } from 'lucide-react';

import { cn } from '@/common/utils';

export type Props = {
  fullScreen?: boolean;
  className?: string;
  containerClassName?: string;
};

export function Loading({
  fullScreen = true,
  className,
  containerClassName,
}: Props) {
  const loading = (
    <Loader2 className={cn('text-icon-gray size-12 animate-spin', className)} />
  );
  if (fullScreen) {
    return (
      <div
        className={cn(
          'flex h-dvh items-center justify-center',
          containerClassName,
        )}
      >
        {loading}
      </div>
    );
  }
  return loading;
}
