import React from 'react';

import { useLocation } from '@tanstack/react-router';

import { LogClick } from '@/common/components/analytics/log-click';
import { LogEvents } from '@/common/const/log-events';

import { ChangeDarkModeBox } from './change-dark-mode-box';
import { ChangeLanguageBox } from './change-language-box';
import { SidebarItem } from './sidebar-item';
import { useSidebarObject } from './use-sidebar';

export const Sidebar = () => {
  const { pathname } = useLocation();
  const sidebarObject = useSidebarObject();

  // TODO: mocking
  const userData = true;

  return (
    <div className="flex flex-col">
      <div>
        {sidebarObject.map((group, i) => (
          <React.Fragment key={i}>
            <ul className="flex flex-col gap-y-2">
              {group
                .filter((menu) =>
                  !userData ? !('needAuth' in menu) || !menu.needAuth : true,
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
                        // TODO: fix type assertion
                        to={`/${menu.path}` as '/'}
                      />
                    </LogClick>
                  </li>
                ))}
            </ul>
            {!(sidebarObject.length - 1 === i) && (
              <div className="bg-greyLight dark:bg-dark_greyDark my-[15px] h-px" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-greyLight dark:bg-dark_greyDark my-[15px] h-px" />
      <ul className="flex flex-col gap-y-2">
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
