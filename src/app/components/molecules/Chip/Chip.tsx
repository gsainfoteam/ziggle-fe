interface ChipProps {
  variant?: 'selected' | 'deselected';
  className?: string;
}

const Chip = ({
  variant = 'deselected',
  children,
  className,
}: React.PropsWithChildren<ChipProps>) => (
  <div
    className={[
      'flex w-max items-center rounded-[5px] px-[10px] py-[5px] font-medium md:h-8 md:text-lg',
      ...(variant === 'selected' ? ['bg-text stroke-white text-white'] : []),
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
