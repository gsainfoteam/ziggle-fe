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
      'flex w-max items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition [&>svg]:size-5',
      variant === 'selected' && 'bg-primary text-on-primary',
      variant === 'selected' && disabled && 'bg-muted-foreground',
      variant === 'deselected' && 'bg-muted text-foreground',
      disabled && 'cursor-not-allowed opacity-60',
      className,
    )}
  >
    {children}
  </div>
);
