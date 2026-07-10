import { Category } from '../models';

export const SEARCH_PANEL_KEY = 'search';

export type FeedPanelId = 'home' | 'deadline' | 'popular' | 'my' | 'reminded';

const FEED_PANEL_IDS = [
  'home',
  'deadline',
  'popular',
  'my',
  'reminded',
] as const satisfies readonly FeedPanelId[];

export const feedPanelKey = (id: FeedPanelId) => `feed:${id}` as const;

export const HOME_PANEL_KEY = feedPanelKey('home');

export const categoryPanelKey = (category: Category) =>
  `category:${category}` as const;

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
