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
  disabled,
  ...props
}: React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>) => (
  <button
    className={cn(
      'font-semibold transition',
      variant && 'rounded-[10px] px-5 py-2.5',
      variant === 'outlined' &&
        !disabled &&
        'border-primary text-primary hover:bg-secondary border',
      variant === 'outlined' &&
        disabled &&
        'border-border text-muted-foreground border',
      variant === 'contained' &&
        !disabled &&
        'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active',
      variant === 'muted' &&
        !disabled &&
        'bg-muted text-muted-foreground hover:brightness-95',
      (variant === 'disabled' || disabled) &&
        'bg-muted text-muted-foreground cursor-not-allowed',
      animated && 'active:scale-95',
      className,
    )}
    disabled={variant === 'disabled' || disabled}
    {...props}
  >
    {children}
  </button>
);
