import { cn } from '@/common/utils';

import { usePopoverContext } from './context';

interface PopoverTriggerProps {
  icon: React.ComponentType<{ className?: string }>;
  boldIcon: React.ComponentType<{ className?: string }>;
  label: string;
  isSelected?: boolean;
  className?: string;
}

export const PopoverTrigger = ({
  icon: IconComponent,
  boldIcon: BoldIconComponent,
  label,
  isSelected = false,
  className,
}: PopoverTriggerProps) => {
  const { openPopover, isOpen } = usePopoverContext();
  const Icon = isSelected || isOpen ? BoldIconComponent : IconComponent;

  return (
    <button
      type="button"
      className={cn(
        'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-full items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:ring-2 focus-visible:outline-none',
        (isSelected || isOpen) && 'bg-greyLight dark:bg-dark_greyDark',
        className,
      )}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onClick={async (e) => {
        await openPopover(e.currentTarget);
      }}
    >
      <span className="w-6">
        <Icon />
      </span>
      <span
        className={cn(
          'ml-4',
          isSelected || isOpen ? 'font-semibold' : 'font-normal',
        )}
      >
        {label}
      </span>
    </button>
  );
};
