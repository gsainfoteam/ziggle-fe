'use client';

import { ParseKeys } from 'i18next';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

interface MypageProfileProps {
  name?: string;
  id?: string;
  email?: string;
  logout?: string;
  quit?: string;
}

export default function MypageProfile({
  name,
  id,
  email,
  lng,
}: PropsWithLng<MypageProfileProps>) {
  const { t } = useTranslation(lng);

  const MYPAGE_FIELDS: {
    field: string | undefined;
    i18nKey: ParseKeys;
  }[] = [
    {
      field: name,
      i18nKey: 'mypage.name',
    },
    {
      field: id,
      i18nKey: 'mypage.id',
    },
    {
      field: email,
      i18nKey: 'mypage.email',
    },
  ];

  return (
    <MypageBox>
      <div className="m-0 self-stretch text-left text-2xl font-semibold text-text dark:text-dark_white">
        {t('mypage.info')}
      </div>
      {MYPAGE_FIELDS.map(({ field, i18nKey }) => (
        <div
          key={field}
          className="flex w-full flex-wrap justify-between gap-4"
        >
          <div className="m-0 text-xl font-medium text-text dark:text-dark_white">
            {t(i18nKey)}
          </div>
          <div className="m-0 text-xl font-normal text-greyDark dark:text-dark_grey">
            {field}
          </div>
        </div>
      ))}
    </MypageBox>
  );
}
