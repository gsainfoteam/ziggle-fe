import { twMerge } from 'tailwind-merge';
type ButtonVariant = 'outlined' | 'contained' | 'disabled';

interface ButtonProps {
  variant?: ButtonVariant;
  animated?: boolean;
}

const Button = ({
  variant,
  children,
  className,
  animated,
  ...props
}: React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>) => (
  <button
    className={twMerge(
      [
        'font-semibold transition',
        ...(variant ? ['rounded px-2.5 py-1 md:px-5 md:py-2.5'] : []),
        ...(variant === 'outlined'
          ? ['border border-primary text-primary hover:bg-secondary']
          : []),
        ...(variant === 'contained'
          ? ['bg-primary text-white hover:brightness-90']
          : []),
        ...(variant === 'disabled' ? ['bg-greylight text-grey '] : []),
        ...(animated ? ['active:scale-95'] : []),
      ].join(' '),
      className,
    )}
    {...props}
    disabled={variant === 'disabled'}
  >
    {children}
  </button>
);

export default Button;
