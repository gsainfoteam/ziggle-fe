import { useContext } from 'react';

import {
  DesktopIcon,
  type Icon,
  MoonIcon,
  SunIcon,
} from '@phosphor-icons/react';

import { ThemeContext } from './context';

import type { Theme } from './context';

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

  return { themeOptions, ...context };
}
