import { useEffect, useState } from 'react';

import { cn } from '@/common/utils';

import { usePopoverContext } from './context';

import type { PopoverItem } from './type';

interface PopoverContentProps {
  isOpen?: boolean;
  items?: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export const PopoverContent = ({
  isOpen: externalIsOpen,
  items: externalItems,
  selectedIndex: externalSelectedIndex,
  onSelect: externalOnSelect,
}: PopoverContentProps) => {
  const context = usePopoverContext();
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(
    externalSelectedIndex ?? context.selectedIndex,
  );

  useEffect(() => {
    if (externalSelectedIndex !== undefined) {
      // TODO: fix this?
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternalSelectedIndex(externalSelectedIndex);
    }
  }, [externalSelectedIndex]);

  const items = externalItems ?? context.items;
  const selectedIndex = externalSelectedIndex ?? internalSelectedIndex;
  const onSelect = externalOnSelect ?? context.onSelect;

  if (externalIsOpen === false) return null;

  return (
    <div
      role="listbox"
      className="border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark flex flex-col rounded-xl border bg-white p-1.5 shadow-lg"
    >
      {items.map((item, index) => {
        const Icon = selectedIndex === index ? item.boldIcon : item.icon;

        return (
          <button
            type="button"
            key={index}
            className={cn(
              'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-full cursor-pointer items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:ring-2 focus-visible:outline-none',
              selectedIndex === index && 'bg-greyLight dark:bg-dark_greyDark',
            )}
            role="option"
            aria-selected={selectedIndex === index}
            onClick={() => {
              setInternalSelectedIndex(index);
              onSelect?.(index);
            }}
          >
            <span className="w-6">
              <Icon />
            </span>
            <span
              className={cn(
                'ml-4',
                selectedIndex === index ? 'font-semibold' : 'font-normal',
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
