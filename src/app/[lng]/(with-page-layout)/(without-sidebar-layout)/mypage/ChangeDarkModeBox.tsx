'use client';

import { useTheme } from 'next-themes';

import Segmented from '@/app/components/shared/Segmented';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

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
          value={theme ?? 'system'}
          onChange={(newTheme) => setTheme(newTheme)}
        />
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
