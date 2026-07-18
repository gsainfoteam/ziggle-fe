import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { HOME_PANEL_KEY } from './panel-keys';

import type { useDeck as UseDeck } from './use-deck';

const memoryStorage = (() => {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => {
      map.clear();
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: memoryStorage,
  configurable: true,
});

const DEFAULT_PANEL = { key: HOME_PANEL_KEY, orderBy: 'recent' as const };

describe('useDeck', () => {
  let useDeck: typeof UseDeck;

  beforeAll(async () => {
    ({ useDeck } = await import('./use-deck'));
  });

  beforeEach(() => {
    memoryStorage.clear();
    useDeck.setState({ panels: [DEFAULT_PANEL] });
  });

  it('does not unpin the last remaining panel', () => {
    useDeck.getState().unpin(HOME_PANEL_KEY);

    expect(useDeck.getState().panels).toEqual([DEFAULT_PANEL]);
  });

  it('rejects an empty panels list and keeps the default deck', () => {
    useDeck.getState().setPanels([]);

    expect(useDeck.getState().panels).toEqual([DEFAULT_PANEL]);
  });

  it('still unpins when more than one panel remains', () => {
    useDeck.setState({
      panels: [DEFAULT_PANEL, { key: 'search' }],
    });

    useDeck.getState().unpin('search');

    expect(useDeck.getState().panels).toEqual([DEFAULT_PANEL]);
  });
});
