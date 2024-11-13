'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import Segmented from '@/app/components/atoms/Segmented/Segmented';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { useLocalStorage } from '@/utils/useLocalStorage';

import MypageBox from './MypageBox';

export type ColorTheme = 'light' | 'dark';
type ColorThemeOptions = ColorTheme | 'system';
export type ColorThemeCookie = { name: 'theme'; value: ColorTheme };

export const useColorTheme = (): {
  themeOption: ColorThemeOptions;
  setThemeOption: (newTheme: ColorThemeOptions) => void;
  determinedTheme: ColorTheme;
  handleSystemThemeChange: () => void;
} => {
  const [_, setCookie] = useCookies(['theme']);
  const [themeOption, setThemeOption] = useLocalStorage<ColorThemeOptions>(
    'theme',
    'system',
  );
  const [triggerRevalidation, setTriggerRevalidation] = useState(0);
  const theme: ColorTheme = useMemo(() => {
    if (themeOption === 'system') {
      const prefersDarkMode = window.matchMedia?.(
        '(prefers-color-scheme: dark)',
      ).matches;

      return prefersDarkMode ? 'dark' : 'light';
    } else {
      return themeOption;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeOption, triggerRevalidation]);

  const handleSystemThemeChange = useCallback(() => {
    setTriggerRevalidation((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setCookie('theme', theme, { path: '/' });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, setCookie]);

  return {
    themeOption,
    setThemeOption,
    determinedTheme: theme,
    handleSystemThemeChange,
  };
};

const ChangeDarkModeBox = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  const { themeOption, setThemeOption } = useColorTheme();

  return (
    <MypageBox>
      <div className="flex justify-between self-stretch">
        <div className="flex text-greyDark dark:text-dark_white">
          {t('mypage.darkModeSettings')}
        </div>
        <Segmented
          options={[
            {
              label: t('mypage.darkModeOptions.light'),
              value: 'light',
            },
            {
              label: t('mypage.darkModeOptions.dark'),
              value: 'dark',
            },
            {
              label: t('mypage.darkModeOptions.system'),
              value: 'system',
            },
          ]}
          value={themeOption}
          onChange={(v) => {
            const prev = themeOption;
            if (prev !== v) {
              setThemeOption(v);
              window.location.reload();
            }
          }}
        />
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
