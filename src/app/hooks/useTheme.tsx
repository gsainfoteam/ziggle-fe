import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useLocalStorage } from './useLocalStorage';

export type ThemeMode = 'light' | 'dark';
type ThemeSettings = 'system' | ThemeMode;
export type themeCookie = { name: 'theme'; value: ThemeMode };

function useThemeProvider(): {
  mode: ThemeMode;
  settings: ThemeSettings;
  updateSettings: (newSettings: ThemeSettings) => void;
} {
  const getDeviceTheme = () => {
    const prefersDarkMode =
      window?.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  };

  const [settings, setSettings] = useLocalStorage<ThemeSettings>(
    'theme',
    'system',
  );
  const [mode, setMode] = useState<ThemeMode>(
    settings === 'system' ? getDeviceTheme() : settings,
  );
  const [_, setCookie] = useCookies(['theme']);

  const updateSettings = (newSettings: ThemeSettings) => {
    setSettings(newSettings);
    setMode(newSettings === 'system' ? getDeviceTheme() : newSettings);
  };

  //   useEffect(() => {
  //     const mql = window.matchMedia('(prefers-color-scheme: dark)');
  //     if (settings === 'system') {
  //       mql.addEventListener('change', () => {
  //         this.checkNative();
  //       });
  //     }

  //     return () => {
  //       mql.removeEventListener('change', () => {
  //         this.checkNative();
  //       });
  //     };
  //   }, [settings]);

  useEffect(() => {
    setCookie('theme', mode, { path: '/' });
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, setCookie]);

  return {
    mode,
    settings,
    updateSettings,
  };
}

const themeContext = createContext<ReturnType<typeof useThemeProvider> | null>(
  null,
);

export default function useTheme() {
  const theme = useContext(themeContext);
  if (theme === null) throw new Error('No ThemeProvider');

  return theme;
}

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const theme = useThemeProvider();
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
}
