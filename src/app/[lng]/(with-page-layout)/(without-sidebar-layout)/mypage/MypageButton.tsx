import Link from 'next/link';
import React from 'react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import CSLink from '@/app/components/shared/CSLink/CSLink';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import BellIcon from '@/assets/icons/bell.svg';
import PencilIcon from '@/assets/icons/edit-pencil.svg';
import FlagIcon from '@/assets/icons/white-flag.svg';

import MypageBox from './MypageBox';

interface MypageButtonType {
  icon: React.ReactNode;
  buttonText: string;
  align: 'left' | 'right';
  onClick?: () => void;
}

const MypageButton = ({ icon, buttonText, align }: MypageButtonType) => {
  return (
    <MypageBox>
      <div className="flex h-36 flex-col justify-between self-stretch">
        <div
          className={`flex ${
            align == 'left' ? 'justify-start' : 'justify-end'
          } self-stretch`}
        >
          {icon}
        </div>
        <div
          className={`self-stretch whitespace-pre-wrap ${
            align == 'left' ? 'text-right' : 'text-left'
          } text-lg font-semibold text-text dark:text-dark_white`}
        >
          {buttonText}
        </div>
      </div>
    </MypageBox>
  );
};

const MypageButtons = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng);

  const ICON_CLASSNAME = 'w-10 stroke-text dark:stroke-dark_white';

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex justify-between gap-4">
        <Analytics event={LogEvents.myClickMyNotice} className="flex-1">
          <Link href={`/${lng}/own?page=0`}>
            <MypageButton
              align="left"
              icon={<PencilIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.myNotice')}
            />
          </Link>
        </Analytics>
        <Analytics event={LogEvents.myClickReminded} className="flex-1">
          <Link href={`/${lng}/reminded?page=0`}>
            <MypageButton
              align="left"
              icon={<BellIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.remindNotice')}
            />
          </Link>
        </Analytics>
      </div>

      <div className="h-[1px] bg-greyLight dark:bg-dark_greyBorder" />

      <div className="flex justify-between gap-4">
        <Analytics className="flex-1" event={LogEvents.myClickBugReport}>
          <CSLink>
            <MypageButton
              align="right"
              icon={<FlagIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.feedback')}
            />
          </CSLink>
        </Analytics>
      </div>
    </div>
  );
};

export default MypageButtons;
