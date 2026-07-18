import { differenceBy, uniqBy } from 'es-toolkit';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { HOME_PANEL_KEY } from './panel-keys';

import type { OrderBy } from '../models';

export interface PanelConfig {
  key: string;
  orderBy?: OrderBy;
}

const DEFAULT_DECK: PanelConfig[] = [
  { key: HOME_PANEL_KEY, orderBy: 'recent' },
];

interface DeckState {
  panels: PanelConfig[];
  pin: (key: string) => void;
  unpin: (key: string) => void;
  toggle: (key: string) => void;
  setOrderBy: (key: string, orderBy: OrderBy) => void;
  setPanels: (panels: PanelConfig[]) => void;
}

export const useDeck = create<DeckState>()(
  persist(
    (set, get) => ({
      panels: DEFAULT_DECK,
      pin: (key) =>
        set((s) => ({
          panels: uniqBy([...s.panels, { key }], (c) => c.key),
        })),
      unpin: (key) =>
        set((s) => ({
          panels: differenceBy(s.panels, [{ key }], (c) => c.key),
        })),
      toggle: (key) =>
        get().panels.some((c) => c.key === key)
          ? get().unpin(key)
          : get().pin(key),
      setOrderBy: (key, orderBy) =>
        set((s) => ({
          panels: s.panels.map((c) => (c.key === key ? { ...c, orderBy } : c)),
        })),
      setPanels: (panels) => set({ panels }),
    }),
    { name: 'ziggle-deck' },
  ),
);

export const useIsPinned = (key: string) =>
  useDeck((s) => s.panels.some((c) => c.key === key));
