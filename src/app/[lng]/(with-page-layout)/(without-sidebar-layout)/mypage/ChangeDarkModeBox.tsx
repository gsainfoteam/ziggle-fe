'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Toggle from '@/app/components/shared/Toggle/Toggle';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

export type ColorTheme = 'light' | 'dark';
export type ColorThemeCookie = { name: 'theme'; value: ColorTheme };

export const useColorTheme = (): [
  ColorTheme | undefined,
  (newTheme: ColorTheme) => void,
] => {
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState<ColorTheme>();

  useEffect(() => {
    const cookieTheme = cookies.theme as ColorTheme | undefined;

    if (cookieTheme) {
      setTheme(cookieTheme);
    } else {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme: ColorTheme = prefersDarkMode ? 'dark' : 'light';
      setTheme(systemTheme);
      setCookie('theme', systemTheme, { path: '/' });
    }
  }, [theme, cookies.theme, setCookie]);

  const updateTheme = (newTheme: ColorTheme) => {
    setTheme(newTheme);
    setCookie('theme', newTheme, { path: '/' });
  };

  return [theme, updateTheme];
};

const ChangeDarkModeBox = ({
  lng,
  defaultTheme,
}: PropsWithLng<{ defaultTheme: ColorTheme }>) => {
  const { t } = useTranslation(lng);

  const [theme, setTheme] = useColorTheme();

  return (
    <MypageBox>
      <div className="flex justify-between self-stretch">
        <div className="flex text-greyDark dark:text-dark_white">
          {t('mypage.switchDarkMode')}
        </div>
        <Toggle
          isSwitched={(theme ?? defaultTheme) === 'dark'}
          onSwitch={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            window.location.reload();
          }}
        />
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
