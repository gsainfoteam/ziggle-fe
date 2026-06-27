import { useContext, useMemo } from 'react';

import {
  DesktopIcon,
  type Icon,
  MoonIcon,
  SunIcon,
} from '@phosphor-icons/react';

import { type Theme, ThemeContext } from './context';
import { matchesDark } from './theme-resolver';

export const themeOptions: readonly { value: Theme; Icon: Icon }[] = [
  { value: 'light', Icon: SunIcon },
  { value: 'dark', Icon: MoonIcon },
  { value: 'system', Icon: DesktopIcon },
];

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, systemTheme } = context;

  const isDark = useMemo(
    () => matchesDark(theme, systemTheme),
    [theme, systemTheme],
  );

  return { isDark, themeOptions, ...context };
}
