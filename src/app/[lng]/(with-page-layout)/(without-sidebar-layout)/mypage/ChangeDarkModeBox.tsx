'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { overlay } from 'overlay-kit';
import { useEffect, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { Popover, PopoverItem } from '@/app/components/shared/Popover';
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
    <MypageBox>
      <PopoverItem
        icon={Palette}
        boldIcon={PaletteFull}
        label="테마"
        isSelected={false}
        onClick={async () => {
          const result = await overlay.openAsync<number>(
            ({ isOpen, close }) => {
              return (
                <Popover
                  isOpen={isOpen}
                  items={[
                    { icon: Sun, boldIcon: SunFull, label: '라이트' },
                    { icon: Moon, boldIcon: MoonFull, label: '다크' },
                    { icon: System, boldIcon: SystemFull, label: '자동' },
                  ]}
                  onSelect={(index) => {
                    close(index);
                  }}
                />
              );
            },
          );

          setTheme(result === 0 ? 'light' : result === 1 ? 'dark' : 'system');
        }}
      />
      {/* <div className="flex justify-between self-stretch">
        <div className="flex text-greyDark dark:text-dark_white">
          {t('mypage.darkModeSettings')}
        </div>
        {!mounted ? (
          <span className="color-[var(--grey)]">
            {t('mypage.loadingDarkModeSettings')}
          </span>
        ) : (
          <div
            className="flex items-center gap-4"
            role="radiogroup"
            aria-label={t('mypage.darkModeSettings')}
          >
            <button
              onClick={() => setTheme('light')}
              aria-label={t('mypage.darkModeOptions.light')}
            >
              <LightModeIcon
                className={clsx(
                  'h-6 transition-colors duration-300',
                  theme === 'light'
                    ? 'fill-[var(--primary)]'
                    : 'fill-[var(--grey)]',
                )}
              />
            </button>
            <button
              onClick={() => setTheme('dark')}
              aria-label={t('mypage.darkModeOptions.dark')}
            >
              <DarkModeIcon
                className={clsx(
                  'h-6 transition-colors duration-300',
                  theme === 'dark'
                    ? 'fill-[var(--primary)]'
                    : 'fill-[var(--grey)]',
                )}
              />
            </button>
            <button
              onClick={() => setTheme('system')}
              aria-label={t('mypage.darkModeOptions.system')}
            >
              <SystemModeIcon
                className={clsx(
                  'h-6 transition-colors duration-300',
                  theme === 'system'
                    ? 'fill-[var(--primary)] stroke-[var(--primary)]'
                    : 'fill-[var(--grey)] stroke-[var(--grey)]',
                )}
              />
            </button>
          </div>
        )}
      </div> */}
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
