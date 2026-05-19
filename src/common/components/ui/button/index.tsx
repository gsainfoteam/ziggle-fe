import { cn } from '@/common/utils';

interface ButtonProps {
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
        'border-greyBorder text-grey border',
      variant === 'contained' &&
        !disabled &&
        'bg-primary dark:text-dark_white text-white hover:brightness-90',
      variant === 'muted' &&
        !disabled &&
        'bg-greyLight text-greyDark hover:brightness-95',
      (variant === 'disabled' || disabled) &&
        'bg-greyLight text-grey cursor-not-allowed',
      animated && 'active:scale-95',
      className,
    )}
    disabled={variant === 'disabled' || disabled}
    {...props}
  >
    {children}
  </button>
);
