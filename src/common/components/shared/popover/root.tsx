import { type ReactNode, useCallback, useRef, useState } from 'react';

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { cn } from '@/common/utils';

import { PopoverContext } from './context';

import type { PopoverItem } from './type';

interface PopoverProps {
  items: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  offsetValue?: number;
  children: ReactNode;
}

export const PopoverRoot = ({
  items,
  selectedIndex,
  onSelect,
  placement = 'bottom',
  offsetValue = 8,
  children,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const floatingPlacement = `${placement}-start` as const;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: floatingPlacement,
    middleware: [offset(offsetValue), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    triggerElementRef.current = null;
  }, []);

  const openPopover = async (buttonElement: HTMLElement) => {
    if (isOpen) {
      closePopover();
      return;
    }

    triggerElementRef.current = buttonElement;
    refs.setReference(buttonElement);
    setIsOpen(true);
  };

  return (
    <PopoverContext.Provider
      value={{
        items,
        selectedIndex,
        onSelect,
        placement,
        offsetValue,
        openPopover,
        isOpen,
      }}
    >
      {children}
      {isOpen && (
        <div
          // TODO: fix this?
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            zIndex: 1000,
          }}
          {...getFloatingProps()}
        >
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
                    selectedIndex === index &&
                      'bg-greyLight dark:bg-dark_greyDark',
                  )}
                  role="option"
                  aria-selected={selectedIndex === index}
                  onClick={() => {
                    onSelect?.(index);
                    closePopover();
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
        </div>
      )}
    </PopoverContext.Provider>
  );
};
