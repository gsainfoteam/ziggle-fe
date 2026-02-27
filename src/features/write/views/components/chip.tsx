import { cn } from '@/common/utils';

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
    className={cn(
      'flex w-max items-center rounded-[5px] px-[10px] py-[5px] text-lg font-medium',
      variant === 'selected' && 'bg-text stroke-white text-white',
      variant === 'selected' && disabled && 'bg-greyDark',
      variant === 'deselected' && 'bg-greyLight stroke-text text-text',
      className,
    )}
  >
    {children}
  </div>
);

export default Chip;
