import type { Theme } from './context';

export function matchesDark(
  theme: Theme,
  systemTheme: 'light' | 'dark',
): boolean {
  return theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const raw = localStorage.getItem('theme');
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  return 'system';
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return matchesDark(getStoredTheme(), getSystemTheme());
}
