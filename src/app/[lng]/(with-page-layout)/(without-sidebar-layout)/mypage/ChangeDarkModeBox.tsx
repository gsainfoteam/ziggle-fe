'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import DarkModeIcon from '@/assets/icons/half-moon.svg';
import LightModeIcon from '@/assets/icons/sun-light.svg';
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
      <div className="flex justify-between self-stretch">
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
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
