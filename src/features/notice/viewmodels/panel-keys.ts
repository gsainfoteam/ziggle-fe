import { Category } from '../models';

export const SEARCH_PANEL_KEY = 'search';

export type FeedPanelId = 'home' | 'deadline' | 'popular' | 'my' | 'bookmarked';

const FEED_PANEL_IDS = [
  'home',
  'deadline',
  'popular',
  'my',
  'bookmarked',
] as const satisfies readonly FeedPanelId[];

export const feedPanelKey = (id: FeedPanelId) => `feed:${id}` as const;

export const HOME_PANEL_KEY = feedPanelKey('home');

export const categoryPanelKey = (category: Category) =>
  `category:${category}` as const;

/** Renamed nav panel keys still present in persisted `ziggle-deck` storage. */
const PANEL_KEY_MIGRATIONS: Record<string, string> = {
  'feed:reminded': feedPanelKey('bookmarked'),
};

export function migratePanelKey(key: string): string {
  return PANEL_KEY_MIGRATIONS[key] ?? key;
}

export function isValidPanelKey(key: string): boolean {
  if (key === SEARCH_PANEL_KEY) return true;

  if (key.startsWith('feed:')) {
    const id = key.slice('feed:'.length);
    return (FEED_PANEL_IDS as readonly string[]).includes(id);
  }

  if (key.startsWith('category:')) {
    const category = key.slice('category:'.length);
    return (Object.values(Category) as string[]).includes(category);
  }

  return false;
}

export function pathnameToPanelKey(pathname: string): string | null {
  const seg = pathname.split('/')[1] ?? '';
  if (!seg) return null;
  if (seg === 'search') return SEARCH_PANEL_KEY;
  if ((FEED_PANEL_IDS as readonly string[]).includes(seg))
    return feedPanelKey(seg as FeedPanelId);

  const category = seg.toUpperCase();
  if ((Object.values(Category) as string[]).includes(category))
    return categoryPanelKey(category as Category);

  return null;
}
