import { createContext, useContext } from 'react';

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerContextValue {
  side: DrawerSide;
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export const useDrawerContext = (): DrawerContextValue => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('Drawer subcomponents must be used inside <Drawer.Root>.');
  }
  return ctx;
};
