import React from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import BellIcon from '@/assets/icons/bell.svg?react';
import PencilIcon from '@/assets/icons/edit-pencil.svg?react';
import FlagIcon from '@/assets/icons/white-flag.svg?react';
import { CSLink, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';

import { MypageBox } from './mypage-box';

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
          className={cn(
            'flex self-stretch',
            align === 'left' ? 'justify-start' : 'justify-end',
          )}
        >
          {icon}
        </div>
        <div
          className={cn(
            'text-text dark:text-dark_white self-stretch text-lg font-semibold whitespace-pre-wrap',
            align == 'left' ? 'text-right' : 'text-left',
          )}
        >
          {buttonText}
        </div>
      </div>
    </MypageBox>
  );
};

export const MypageButtons = () => {
  const { t } = useTranslation('auth');

  const ICON_CLASSNAME = 'w-10 stroke-text dark:stroke-dark_white';

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex justify-between gap-4">
        <LogClick eventName={LogEvents.myClickMyNotice}>
          <Link to="/$category" params={{ category: 'own' }} className="flex-1">
            <MypageButton
              align="left"
              icon={<PencilIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.myNotice')}
            />
          </Link>
        </LogClick>
        <LogClick eventName={LogEvents.myClickReminded}>
          <Link
            to="/$category"
            params={{ category: 'reminded' }}
            className="flex-1"
          >
            <MypageButton
              align="left"
              icon={<BellIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.remindNotice')}
            />
          </Link>
        </LogClick>
      </div>

      <div className="bg-greyLight dark:bg-dark_greyBorder h-px" />

      <div className="flex justify-between gap-4">
        <LogClick eventName={LogEvents.myClickBugReport}>
          <CSLink className="flex-1">
            <MypageButton
              align="right"
              icon={<FlagIcon className={ICON_CLASSNAME} />}
              buttonText={t('mypage.feedback')}
            />
          </CSLink>
        </LogClick>
      </div>
    </div>
  );
};
