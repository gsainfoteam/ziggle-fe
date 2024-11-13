'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Segmented from '@/app/components/shared/Segmented';
import useTheme from '@/app/hooks/useTheme';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

const ChangeDarkModeBox = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  const { settings, updateSettings } = useTheme();

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
          value={settings}
          onChange={updateSettings}
        />
      </div>
    </MypageBox>
  );
};

export default ChangeDarkModeBox;
