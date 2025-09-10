import clsx from 'clsx';
import { useState } from 'react';

interface DropdownProps {
  items: {
    icon: React.ComponentType<{ className?: string }>;
    boldIcon: React.ComponentType<{ className?: string }>;
    label: string;
  }[];
  selectedIndex: number | null;
  onSelect?: (index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedIndex: initialSelectedIndex,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

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

export default Dropdown;
