import { useState } from 'react';

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
import { cn } from '@/common/utils';

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeItem {
  value: ThemeOption;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  boldIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export const ChangeDarkModeBox = () => {
  const { t } = useTranslation('layout');
  const { theme, setTheme } = useTheme();

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const items: ThemeItem[] = [
    {
      value: 'light',
      icon: Sun,
      boldIcon: SunFull,
      label: t('sidebar.theme_options.light'),
    },
    {
      value: 'dark',
      icon: Moon,
      boldIcon: MoonFull,
      label: t('sidebar.theme_options.dark'),
    },
    {
      value: 'system',
      icon: System,
      boldIcon: SystemFull,
      label: t('sidebar.theme_options.system'),
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen((value) => !value);
        }}
        aria-expanded={isOpen}
        className={cn(
          'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-48 items-center gap-5 rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isOpen && 'bg-greyLight dark:bg-dark_greyDark',
        )}
      >
        <span className="w-6">
          {isOpen ? <PaletteFull /> : <Palette />}
        </span>
        <span className={isOpen ? 'font-semibold' : 'font-normal'}>
          {t('sidebar.theme')}
        </span>
      </button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-start"
      >
        <Popover.Body className="flex flex-col p-1.5">
          {items.map((item) => {
            const isSelected = theme === item.value;
            const Icon = isSelected ? item.boldIcon : item.icon;
            return (
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                key={item.value}
                onClick={() => {
                  setTheme(item.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'focus-visible:ring-primary dark:hover:bg-dark_grey flex w-full cursor-pointer items-center rounded-md px-4 py-2 text-left transition duration-300 hover:bg-gray-300 focus-visible:ring-2 focus-visible:outline-none',
                  isSelected && 'bg-greyLight dark:bg-dark_greyDark',
                )}
              >
                <span className="w-6">
                  <Icon />
                </span>
                <span
                  className={cn(
                    'ml-4',
                    isSelected ? 'font-semibold' : 'font-normal',
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </Popover.Body>
      </Popover.Root>
    </>
  );
};
