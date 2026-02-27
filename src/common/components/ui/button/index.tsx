interface ButtonProps {
  variant?: 'outlined' | 'contained' | 'disabled';
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
    className={`font-semibold transition ${variant && 'rounded-[10px] px-2.5 py-1 md:px-5 md:py-2.5'} ${
      variant === 'outlined' &&
      'border-primary text-primary hover:bg-secondary border'
    } ${variant === 'contained' && 'bg-primary text-white hover:brightness-90'} ${variant === 'disabled' && 'bg-greylight text-grey'} ${animated && 'active:scale-95'} ${className} `}
    {...props}
    disabled={variant === 'disabled'}
  >
    {children}
  </button>
);
