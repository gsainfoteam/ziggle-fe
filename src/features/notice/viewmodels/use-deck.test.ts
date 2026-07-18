import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { feedPanelKey, HOME_PANEL_KEY } from './panel-keys';

import type {
  getHomePanel as GetHomePanel,
  useDeck as UseDeck,
} from './use-deck';

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

describe('getHomePanel', () => {
  let getHomePanel: typeof GetHomePanel;

  beforeAll(async () => {
    ({ getHomePanel } = await import('./use-deck'));
  });

  it('returns the home panel even when it is not first after reorder', () => {
    const bookmarked = {
      key: feedPanelKey('bookmarked'),
      orderBy: 'recent' as const,
    };
    const home = { key: HOME_PANEL_KEY, orderBy: 'hot' as const };

    expect(getHomePanel([bookmarked, home])).toEqual(home);
  });

  it('falls back to the default home panel when home is missing', () => {
    expect(
      getHomePanel([{ key: feedPanelKey('bookmarked'), orderBy: 'recent' }]),
    ).toEqual(DEFAULT_PANEL);
  });
});

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

  it('migrates renamed panel keys and drops unknown ones on setPanels', () => {
    useDeck
      .getState()
      .setPanels([
        DEFAULT_PANEL,
        { key: 'feed:reminded', orderBy: 'hot' },
        { key: 'legacy-unknown' },
        { key: 'search' },
      ]);

    expect(useDeck.getState().panels).toEqual([
      DEFAULT_PANEL,
      { key: feedPanelKey('bookmarked'), orderBy: 'hot' },
      { key: 'search' },
    ]);
  });

  it('falls back to the default deck when every persisted key is invalid', () => {
    useDeck.getState().setPanels([{ key: 'gone' }, { key: 'also-gone' }]);

    expect(useDeck.getState().panels).toEqual([DEFAULT_PANEL]);
  });

  it('dedupes after migrating a renamed key onto an existing panel', () => {
    useDeck.getState().setPanels([
      { key: 'feed:reminded', orderBy: 'deadline' },
      { key: feedPanelKey('bookmarked'), orderBy: 'recent' },
    ]);

    expect(useDeck.getState().panels).toEqual([
      { key: feedPanelKey('bookmarked'), orderBy: 'deadline' },
    ]);
  });
});
