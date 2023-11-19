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
        'flex h-6 w-max items-center rounded-lg border-2 border-primary px-3 md:h-8',
        ...(variant === 'outlined' ? ['bg-transparent text-primary'] : []),
        ...(variant === 'contained' ? ['bg-primary text-white'] : []),
        ...(variant === 'deselected'
          ? ['border-none bg-deselected text-secondaryText']
          : []),
        ...(className ? [className] : []),
      ].join(' ')}
    >
      {children}
    </div>
  </div>
);

export default Chip;
