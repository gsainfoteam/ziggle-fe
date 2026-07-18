import { cn } from '@/common/utils';

interface ButtonProps {
  /** contained=primary, outlined=secondary(soft), muted=neutral */
  variant?: 'outlined' | 'contained' | 'disabled' | 'muted';
  animated?: boolean;
}

export const Button = ({
  variant,
  children,
  className,
  animated,
  ...props
}: React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>) => (
  <button
    className={cn(
      'font-semibold transition',
      variant && 'rounded-[10px] px-5 py-2.5',
      variant === 'outlined' &&
        'border-primary text-primary hover:bg-secondary border',
      variant === 'contained' &&
        'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active',
      variant === 'disabled' && 'bg-muted text-muted-foreground',
      variant === 'muted' &&
        'bg-muted text-muted-foreground hover:brightness-95',
      animated && 'active:scale-95',
      className,
    )}
    {...props}
    disabled={variant === 'disabled'}
  >
    {children}
  </button>
);
