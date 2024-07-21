type ButtonVariant = 'outlined' | 'contained' | 'disabled';

interface ButtonProps {
  variant?: ButtonVariant;
  animated?: boolean;
  isBig?: boolean;
}

const Button = ({
  variant,
  children,
  className,
  animated,
  isBig,
  ...props
}: React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>) => (
  <button
    className={[
      'font-semibold transition',
      ...(variant ? ['rounded-[10px] px-2.5 py-1 md:px-5 md:py-2.5'] : []),
      ...(isBig ? ['rounded-[10px]'] : ['rounded-[5px]']),
      ...(variant === 'outlined'
        ? ['border border-primary text-primary hover:bg-secondary']
        : []),
      ...(variant === 'contained'
        ? ['bg-primary text-white hover:brightness-90']
        : []),
      ...(variant === 'disabled' ? ['bg-greyLight text-grey'] : []),
      ...(animated ? ['active:scale-95'] : []),
      ...(className ? [className] : []),
    ].join(' ')}
    {...props}
    disabled={variant === 'disabled'}
  >
    {children}
  </button>
);

export default Button;
