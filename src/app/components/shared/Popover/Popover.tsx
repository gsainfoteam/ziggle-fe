'use client';

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface PopoverItem {
  icon: React.ComponentType<{ className?: string }>;
  boldIcon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface PopoverContextValue {
  items: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  offsetValue?: number;
  openPopover: (buttonElement: HTMLElement) => Promise<number | null>;
  isOpen: boolean;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within Popover');
  }
  return context;
};

interface PopoverProps {
  items: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  offsetValue?: number;
  children: ReactNode;
}

const PopoverRoot: React.FC<PopoverProps> = ({
  items,
  selectedIndex,
  onSelect,
  placement = 'bottom',
  offsetValue = 8,
  children,
}) => {
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
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    triggerElementRef.current = null;
  }, []);

  const openPopover = async (
    buttonElement: HTMLElement,
  ): Promise<number | null> => {
    if (isOpen) {
      closePopover();
      return null;
    }

    triggerElementRef.current = buttonElement;
    refs.setReference(buttonElement);
    setIsOpen(true);
    return null;
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
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            zIndex: 1000,
          }}
          {...getFloatingProps()}
        >
          <div
            role="listbox"
            className="flex flex-col rounded-xl border border-greyBorder bg-white p-1.5 shadow-lg dark:border-dark_greyBorder dark:bg-dark_dark"
          >
            {items.map((item, index) => {
              const Icon = selectedIndex === index ? item.boldIcon : item.icon;

              return (
                <button
                  type="button"
                  key={index}
                  className={clsx(
                    'flex w-full cursor-pointer items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-dark_grey',
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
                    className={clsx(
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

interface PopoverTriggerProps {
  icon: React.ComponentType<{ className?: string }>;
  boldIcon: React.ComponentType<{ className?: string }>;
  label: string;
  isSelected?: boolean;
  className?: string;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  icon: IconComponent,
  boldIcon: BoldIconComponent,
  label,
  isSelected = false,
  className,
}) => {
  const { openPopover, isOpen } = usePopoverContext();
  const Icon = isSelected || isOpen ? BoldIconComponent : IconComponent;

  return (
    <button
      type="button"
      className={clsx(
        'flex w-full items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-dark_grey',
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
        className={clsx(
          'ml-4',
          isSelected || isOpen ? 'font-semibold' : 'font-normal',
        )}
      >
        {label}
      </span>
    </button>
  );
};

interface PopoverContentProps {
  isOpen?: boolean;
  items?: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  isOpen: externalIsOpen,
  items: externalItems,
  selectedIndex: externalSelectedIndex,
  onSelect: externalOnSelect,
}) => {
  const context = usePopoverContext();
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(
    externalSelectedIndex ?? context.selectedIndex,
  );

  const items = externalItems ?? context.items;
  const selectedIndex = externalSelectedIndex ?? internalSelectedIndex;
  const onSelect = externalOnSelect ?? context.onSelect;

  if (externalIsOpen === false) return null;

  return (
    <div
      role="listbox"
      className="flex flex-col rounded-xl border border-greyBorder bg-white p-1.5 shadow-lg dark:border-dark_greyBorder dark:bg-dark_dark"
    >
      {items.map((item, index) => {
        const Icon = selectedIndex === index ? item.boldIcon : item.icon;

        return (
          <button
            type="button"
            key={index}
            className={clsx(
              'flex w-full cursor-pointer items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-dark_grey',
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
              className={clsx(
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

// Compound component 패턴
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
