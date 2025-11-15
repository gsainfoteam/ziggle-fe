'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface PopoverItem {
  icon: React.ComponentType<{ className?: string }>;
  boldIcon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface PopoverProps {
  isOpen: boolean;
  items: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export const PopoverItem: React.FC<
  PopoverItem & { isSelected: boolean; onClick: () => void }
> = ({ icon, boldIcon, label, isSelected, onClick }) => {
  const Icon = isSelected ? boldIcon : icon;

  return (
    <div
      className={clsx(
        'w-35 flex items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none dark:hover:bg-dark_grey',
        isSelected && 'bg-greyLight dark:bg-dark_greyDark',
      )}
      onClick={onClick}
    >
      <span className="w-6">
        <Icon />
      </span>
      <span
        className={clsx('ml-4', isSelected ? 'font-semibold' : 'font-normal')}
      >
        {label}
      </span>
    </div>
  );
};

export const Popover: React.FC<PopoverProps> = ({
  isOpen,
  items,
  selectedIndex: initialSelectedIndex,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  if (!isOpen) return null;

  return (
    <div className="flex flex-col rounded-xl border border-greyBorder p-1.5 dark:border-dark_greyBorder">
      {items.map((item, index) => {
        const Icon = selectedIndex === index ? item.boldIcon : item.icon;

        return (
          <div
            key={index}
            className={clsx(
              'w-35 flex items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none dark:hover:bg-dark_grey',
              selectedIndex === index && 'bg-greyLight dark:bg-dark_greyDark',
            )}
            onClick={() => {
              setSelectedIndex(index);
              onSelect?.(index);
            }}
          >
            <span className="w-6">
              <Icon />
            </span>
            <span
              className={clsx(
                'ml-4',
                selectedIndex === index ? 'font-semibold' : 'font-normal',
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
