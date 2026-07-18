import { cn } from '@/common/utils';

interface ChipProps {
  variant?: 'selected' | 'deselected';
  className?: string;
  disabled?: boolean;
}

export const Chip = ({
  variant = 'deselected',
  children,
  className,
  disabled,
}: React.PropsWithChildren<ChipProps>) => (
  <div
    className={cn(
      'flex w-max items-center rounded-[5px] px-[10px] py-[5px] text-lg font-medium',
      variant === 'selected' &&
        'bg-foreground text-on-primary stroke-on-primary',
      variant === 'selected' && disabled && 'bg-muted-foreground',
      variant === 'deselected' && 'bg-muted stroke-foreground text-foreground',
      className,
    )}
  >
    {children}
  </div>
);
