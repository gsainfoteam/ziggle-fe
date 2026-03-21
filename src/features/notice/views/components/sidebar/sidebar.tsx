import React from 'react';

import { useLocation } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import FlagIcon from '@/assets/icons/white-flag.svg?react';
import { CSLink, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';

import { ChangeDarkModeBox } from './change-dark-mode-box';
import { ChangeLanguageBox } from './change-language-box';
import { SidebarItem } from './sidebar-item';
import { useSidebarObject } from './use-sidebar';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const sidebarObject = useSidebarObject();
  const { t } = useTranslation('auth');

  const { data: user } = useUser();

  return (
    <div className="flex flex-col">
      <div>
        {sidebarObject.map((group, i) => (
          <React.Fragment key={i}>
            <ul className="flex flex-col gap-y-2">
              {group
                .filter((menu) =>
                  !user ? !('needAuth' in menu) || !menu.needAuth : true,
                )
                .map((menu, i) => (
                  <li key={i} className="flex flex-row">
                    <LogClick
                      eventName={LogEvents.sidebarClickLink}
                      properties={{ key: menu.key }}
                    >
                      <SidebarItem
                        icon={
                          <menu.icons.regular className="stroke-text dark:stroke-dark_white" />
                        }
                        boldIcon={
                          <menu.icons.bold className="fill-text stroke-text dark:fill-dark_white dark:stroke-none" />
                        }
                        title={menu.title}
                        isSelected={pathname.startsWith(`/${menu.path}`)}
                        {...(menu.path === 'write'
                          ? { to: '/write' }
                          : {
                              to: '/$category',
                              params: { category: menu.path },
                            })}
                      />
                    </LogClick>
                  </li>
                ))}
            </ul>
            {!(sidebarObject.length - 1 === i) && (
              <div className="bg-greyLight dark:bg-dark_greyDark my-3.75 h-px" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-greyLight dark:bg-dark_greyDark my-3.75 h-px" />
      <ul className="flex flex-col gap-y-2">
        <li className="w-full">
          <LogClick eventName={LogEvents.myClickBugReport}>
            <CSLink
              className={cn(
                'dark:hover:bg-dark_grey flex w-48 items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300',
              )}
            >
              <span className="w-6">
                <FlagIcon className="stroke-text dark:stroke-dark_white" />
              </span>
              <span className="ml-4">{t('mypage.feedback')}</span>
            </CSLink>
          </LogClick>
        </li>
        <li className="w-full">
          <ChangeDarkModeBox />
        </li>
        <li className="w-full">
          <ChangeLanguageBox />
        </li>
      </ul>
    </div>
  );
};
