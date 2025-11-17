'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Popover } from '@/app/components/shared/Popover';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import Moon from '@/assets/icons/moon.svg';
import MoonFull from '@/assets/icons/moon-full.svg';
import Palette from '@/assets/icons/palette.svg';
import PaletteFull from '@/assets/icons/palette-full.svg';
import Sun from '@/assets/icons/sun.svg';
import SunFull from '@/assets/icons/sun-full.svg';
import System from '@/assets/icons/system.svg';
import SystemFull from '@/assets/icons/system-full.svg';

const ChangeDarkModeBox = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  const { theme, setTheme } = useTheme();

  return (
    <Popover
      items={[
        {
          icon: Sun,
          boldIcon: SunFull,
          label: t('sidebar.themeOptions.light'),
        },
        {
          icon: Moon,
          boldIcon: MoonFull,
          label: t('sidebar.themeOptions.dark'),
        },
        {
          icon: System,
          boldIcon: SystemFull,
          label: t('sidebar.themeOptions.system'),
        },
      ]}
      selectedIndex={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
      onSelect={(index) => {
        const themeValue =
          index === 0 ? 'light' : index === 1 ? 'dark' : 'system';
        setTheme(themeValue);
      }}
      placement="bottom"
      offsetValue={8}
    >
      <Popover.Trigger
        icon={Palette}
        boldIcon={PaletteFull}
        label={t('sidebar.theme')}
        isSelected={false}
      />
    </Popover>
  );
};

export default ChangeDarkModeBox;
