import { differenceBy, uniqBy } from 'es-toolkit';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { HOME_PANEL_KEY } from './panel-keys';

import type { OrderBy } from '../models';

export interface PanelConfig {
  key: string;
  orderBy?: OrderBy;
}

const DEFAULT_HOME_PANEL: PanelConfig = {
  key: HOME_PANEL_KEY,
  orderBy: 'recent',
};

const DEFAULT_DECK: PanelConfig[] = [DEFAULT_HOME_PANEL];

function ensurePanels(panels: PanelConfig[]): PanelConfig[] {
  return panels.length > 0 ? panels : DEFAULT_DECK;
}

export function getHomePanel(panels: PanelConfig[]): PanelConfig {
  return panels.find((p) => p.key === HOME_PANEL_KEY) ?? DEFAULT_HOME_PANEL;
}

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
        set((s) => {
          if (s.panels.length <= 1) return s;
          return {
            panels: differenceBy(s.panels, [{ key }], (c) => c.key),
          };
        }),
      toggle: (key) =>
        get().panels.some((c) => c.key === key)
          ? get().unpin(key)
          : get().pin(key),
      setOrderBy: (key, orderBy) =>
        set((s) => ({
          panels: s.panels.map((c) => (c.key === key ? { ...c, orderBy } : c)),
        })),
      setPanels: (panels) => set({ panels: ensurePanels(panels) }),
    }),
    {
      name: 'ziggle-deck',
      merge: (persisted, current) => {
        const stored = persisted as Partial<DeckState> | undefined;
        return {
          ...current,
          ...stored,
          panels: ensurePanels(stored?.panels ?? current.panels),
        };
      },
    },
  ),
);

export const useIsPinned = (key: string) =>
  useDeck((s) => s.panels.some((c) => c.key === key));
