type ButtonVariant = 'outlined' | 'contained';

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
    className={[
      'transition',
      ...(variant ? ['rounded py-1 px-2.5 md:py-2.5 md:px-5'] : []),
      ...(variant === 'outlined'
        ? ['border border-primary text-primary hover:bg-secondary']
        : []),
      ...(variant === 'contained'
        ? ['bg-primary text-white hover:brightness-90']
        : []),
      ...(animated ? ['active:scale-95'] : []),
      ...(className ? [className] : []),
    ].join(' ')}
    {...props}
  >
    {children}
  </button>
);

export default Button;
