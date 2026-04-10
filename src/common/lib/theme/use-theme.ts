import { useContext, useMemo } from 'react';

import { ThemeContext } from './context';
import { matchesDark } from './theme-resolver';

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

  return { isDark, ...context };
}
