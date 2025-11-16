'use client';

import clsx from 'clsx';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
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
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    setPosition(null);
    triggerElementRef.current = null;
  }, []);

  const openPopover = async (
    buttonElement: HTMLElement,
  ): Promise<number | null> => {
    // 이미 열려있으면 닫기
    if (isOpen) {
      closePopover();
      return null;
    }

    // 버튼의 위치를 가져옴
    const rect = buttonElement.getBoundingClientRect();
    triggerElementRef.current = buttonElement;

    // Popover의 크기를 추정
    const popoverWidth = 140; // w-35는 약 140px
    const popoverHeight = items.length * 40; // 각 아이템이 약 40px 높이

    // 위치 계산
    let x = 0;
    let y = 0;

    switch (placement) {
      case 'bottom':
        x = rect.left;
        y = rect.bottom + offsetValue;
        break;
      case 'top':
        x = rect.left;
        y = rect.top - popoverHeight - offsetValue;
        break;
      case 'left':
        x = rect.left - popoverWidth - offsetValue;
        y = rect.top;
        break;
      case 'right':
        x = rect.right + offsetValue;
        y = rect.top;
        break;
    }

    setPosition({ x, y });
    setIsOpen(true);
    return null;
  };

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const pageClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        popoverContentRef.current &&
        !popoverContentRef.current.contains(target) &&
        triggerElementRef.current &&
        !triggerElementRef.current.contains(target)
      ) {
        closePopover();
      }
    };

    // 다음 이벤트 루프에서 리스너 추가 (현재 클릭 이벤트가 처리된 후)
    setTimeout(() => {
      window.addEventListener('click', pageClickEvent, true);
    }, 0);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  }, [isOpen, closePopover]);

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
      {isOpen && position && (
        <div
          ref={popoverContentRef}
          style={{
            position: 'fixed',
            top: `${position.y}px`,
            left: `${position.x}px`,
            zIndex: 1000,
          }}
          onClick={(e) => {
            // Popover 내부 클릭은 이벤트 전파 방지
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col rounded-xl border border-greyBorder bg-white p-1.5 dark:border-dark_greyBorder dark:bg-dark_dark">
            {items.map((item, index) => {
              const Icon = selectedIndex === index ? item.boldIcon : item.icon;

              return (
                <div
                  key={index}
                  className={clsx(
                    'w-35 flex items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none dark:hover:bg-dark_grey',
                    selectedIndex === index &&
                      'bg-greyLight dark:bg-dark_greyDark',
                  )}
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
                </div>
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
  const { openPopover } = usePopoverContext();
  const Icon = isSelected ? BoldIconComponent : IconComponent;

  return (
    <div
      className={clsx(
        'w-35 flex items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none dark:hover:bg-dark_grey',
        isSelected && 'bg-greyLight dark:bg-dark_greyDark',
        className,
      )}
      onClick={async (e) => {
        await openPopover(e.currentTarget);
      }}
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
    <div className="flex flex-col rounded-xl border border-greyBorder bg-white p-1.5 dark:border-dark_greyBorder dark:bg-dark_dark">
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
          </div>
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
