import {
  type PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { type Theme, ThemeContext } from './context';

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (typeof window !== 'undefined' &&
        (localStorage.getItem('theme') as Theme)) ||
      'system',
  );

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(systemTheme);
      localStorage.removeItem('theme');
    } else {
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, systemTheme]);

  const updateSystemTheme = useCallback(() => {
    const newSystemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    setSystemTheme(newSystemTheme);
  }, [setSystemTheme]);

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme],
  );

  useLayoutEffect(() => {
    applyTheme();
  }, [applyTheme]);

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateSystemTheme();

    handler();

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [updateSystemTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, systemTheme, setTheme: updateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
