interface ChipProps {
  variant?: 'selected' | 'deselected';
  className?: string;
  disabled?: boolean;
}

const Chip = ({
  variant = 'deselected',
  children,
  className,
  disabled,
}: React.PropsWithChildren<ChipProps>) => (
  <div
    className={[
      'flex w-max items-center rounded-[5px] px-[10px] py-[5px] text-lg font-medium',
      ...(variant === 'selected'
        ? ['stroke-white text-white', disabled ? 'bg-greyDark' : 'bg-text']
        : []),
      ...(variant === 'deselected'
        ? ['bg-greyLight stroke-text text-text']
        : []),
      ...(className ? [className] : []),
    ].join(' ')}
  >
    {children}
  </div>
);

export default Chip;
