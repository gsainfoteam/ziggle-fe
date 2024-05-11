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
      'flex w-max items-center rounded-[5px] px-[10px] py-[5px] text-lg font-medium',
      ...(variant === 'selected'
        ? [
            'bg-text stroke-white text-white dark:bg-dark_white dark:stroke-dark_dark dark:text-dark_dark',
          ]
        : []),
      ...(variant === 'deselected'
        ? [
            'bg-greyLight stroke-text text-text dark:bg-dark_greyDark dark:stroke-dark_white dark:text-dark_white',
          ]
        : []),
      ...(className ? [className] : []),
    ].join(' ')}
  >
    {children}
  </div>
);

export default Chip;
