interface ChipProps {
  variant?: 'outlined' | 'contained' | 'deselected';
  className?: string;
}

const Chip = ({
  variant = 'outlined',
  children,
  className,
}: React.PropsWithChildren<ChipProps>) => (
  <div className="font-medium md:text-lg">
    <div
      className={[
        'flex items-center h-6 md:h-8 w-max border-2 border-primary rounded-lg px-3',
        ...(variant === 'outlined' ? ['text-primary bg-transparent'] : []),
        ...(variant === 'contained' ? ['text-white bg-primary'] : []),
        ...(variant === 'deselected'
          ? ['bg-deselected text-secondaryText border-none']
          : []),
        ...(className ? [className] : []),
      ].join(' ')}
    >
      {children}
    </div>
  </div>
);

export default Chip;
