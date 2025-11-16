'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { Popover } from '@/app/components/shared/Popover';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import DarkModeIcon from '@/assets/icons/half-moon.svg';
import Lang from '@/assets/icons/lang.svg';
import LangEn from '@/assets/icons/lang-en.svg';
import LangEnFull from '@/assets/icons/lang-en-full.svg';
import LangFull from '@/assets/icons/lang-full.svg';
import LangKo from '@/assets/icons/lang-ko.svg';
import LangKoFull from '@/assets/icons/lang-ko-full.svg';
import Moon from '@/assets/icons/moon.svg';
import MoonFull from '@/assets/icons/moon-full.svg';
import Palette from '@/assets/icons/palette.svg';
import PaletteFull from '@/assets/icons/palette-full.svg';
import Sun from '@/assets/icons/sun.svg';
import SunFull from '@/assets/icons/sun-full.svg';
import LightModeIcon from '@/assets/icons/sun-light.svg';
import System from '@/assets/icons/system.svg';
import SystemFull from '@/assets/icons/system-full.svg';
import SystemModeIcon from '@/assets/icons/system-outlined.svg';

import MypageBox from './MypageBox';

const ChangeDarkModeBox = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Popover
      items={[
        { icon: Sun, boldIcon: SunFull, label: '라이트' },
        { icon: Moon, boldIcon: MoonFull, label: '다크' },
        { icon: System, boldIcon: SystemFull, label: '자동' },
      ]}
      selectedIndex={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
      onSelect={(index) => {
        const themeValue =
          index === 0 ? 'light' : index === 1 ? 'dark' : 'system';
        setTheme(themeValue);
      }}
      placement="top"
      offsetValue={8}
    >
      <Popover.Trigger
        icon={Palette}
        boldIcon={PaletteFull}
        label="테마"
        isSelected={false}
      />
    </Popover>
  );
};

export default ChangeDarkModeBox;
