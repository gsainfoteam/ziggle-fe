'use client';

import { useTheme } from 'next-themes';

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

  const { theme, setTheme } = useTheme();

  return (
    <MypageBox>
      <div className="flex justify-between self-stretch">
        <div className="flex text-greyDark dark:text-dark_white">
          {t('mypage.darkModeSettings')}
        </div>
        <div className="flex items-center gap-4">
          <DarkModeIcon className="h-6" />
          <LightModeIcon className="h-6" />
          <SystemModeIcon className="h-6" />
        </div>
        {/* <Segmented
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
          value={theme ?? 'system'}
          onChange={(newTheme) => {
            sendLog(LogEvents.myClickMode, {
              mode: newTheme,
            });
            setTheme(newTheme);
          }}
        /> */}
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
