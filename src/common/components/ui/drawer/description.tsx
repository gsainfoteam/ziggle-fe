import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

import { useDrawerContext } from './context';

interface DrawerDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const DrawerDescription = ({
  children,
  className,
}: DrawerDescriptionProps) => {
  const { descriptionId } = useDrawerContext();
  return (
    <p
      id={descriptionId}
      className={cn(
        'text-greyDark dark:text-dark_grey text-sm leading-relaxed',
        className,
      )}
    >
      {children}
    </p>
  );
};
