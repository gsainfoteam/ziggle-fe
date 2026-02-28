import { useTranslation } from 'react-i18next';

import MoonFull from '@/assets/icons/moon-full.svg?react';
import Moon from '@/assets/icons/moon.svg?react';
import PaletteFull from '@/assets/icons/palette-full.svg?react';
import Palette from '@/assets/icons/palette.svg?react';
import SunFull from '@/assets/icons/sun-full.svg?react';
import Sun from '@/assets/icons/sun.svg?react';
import SystemFull from '@/assets/icons/system-full.svg?react';
import System from '@/assets/icons/system.svg?react';
import { Popover } from '@/common/components';
import { useTheme } from '@/common/lib/theme';

export const ChangeDarkModeBox = () => {
  const { t } = useTranslation('layout');
  const { theme, setTheme } = useTheme();

  return (
    <Popover.Root
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
    </Popover.Root>
  );
};
