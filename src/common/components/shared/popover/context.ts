import { createContext, useContext } from 'react';

import type { PopoverItem } from './type';

interface PopoverContextValue {
  items: PopoverItem[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  offsetValue?: number;
  openPopover: (buttonElement: HTMLElement) => Promise<void>;
  isOpen: boolean;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within Popover');
  }
  return context;
};
