import { Link, useLocation } from '@tanstack/react-router';

import { FlagIcon, GearSixIcon, UserIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { CSLink, LogClick, Popover } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useTheme } from '@/common/lib/theme';
import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';

import { SidebarItem, sidebarRowClass } from './sidebar-item';
import { type NavRowItem, useNoticeNav } from '../use-notice-nav';
import { ProfileModalButton } from '../../modals/profile-modal';

export const Sidebar = ({
  onClose,
  collapsible = false,
}: { onClose?: () => void; collapsible?: boolean } = {}) => {
  const { pathname } = useLocation();
  const { t: tLayout, i18n } = useTranslation('layout');
  const { t: tAuth } = useTranslation('auth');
  const { data: user } = useUser();
  const { theme, setTheme, themeOptions } = useTheme();
  const nav = useNoticeNav();

  const labelClass = collapsible
    ? 'opacity-0 transition-opacity duration-200 group-hover/sb:opacity-100 xl:opacity-100'
    : undefined;

  const renderNavRow = (navKey: string, item: NavRowItem) => (
    <li key={navKey}>
      <LogClick
        eventName={LogEvents.sidebarClickLink}
        properties={{ key: navKey }}
      >
        <SidebarItem
          icon={item.Icon}
          activeIcon={item.ActiveIcon}
          isActive={pathname.startsWith(`/${navKey}`)}
          labelClassName={labelClass}
        >
          <Link {...item.link} onClick={onClose}>
            {item.title}
          </Link>
        </SidebarItem>
      </LogClick>
    </li>
  );

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <ul className="flex flex-col gap-y-0.5">
        {renderNavRow('home', nav.home)}
        {renderNavRow('search', nav.search)}
        {Object.entries(nav.feeds)
          .filter(([key]) => !['recent', 'deadline', 'popular'].includes(key))
          .map(([key, item]) => renderNavRow(key.toLowerCase(), item))}
      </ul>

      <ul className="flex flex-col gap-y-0.5">
        {Object.entries(nav.categories).map(([key, item]) =>
          renderNavRow(key.toLowerCase(), item),
        )}
      </ul>

      <ul className="mt-auto flex flex-col gap-y-0.5">
        <li>
          <Popover.Menu>
            <Popover.Trigger>
              {(open) => (
                <SidebarItem
                  icon={<GearSixIcon />}
                  activeIcon={<GearSixIcon weight="fill" />}
                  isActive={open}
                  variant="toggle"
                  labelClassName={labelClass}
                >
                  <button type="button" aria-expanded={open}>
                    {tLayout('sidebar.settings')}
                  </button>
                </SidebarItem>
              )}
            </Popover.Trigger>
            <Popover.Content placement="right-start">
              {({ close }) => (
                <Popover.Body className="flex w-52 flex-col gap-y-0.5 rounded-xl p-1.5">
                  <p className="text-greyDark px-2.5 pt-1 pb-1 text-xs font-semibold">
                    {tLayout('sidebar.theme')}
                  </p>
                  {themeOptions.map(({ value, Icon }) => {
                    const selected = theme === value;
                    return (
                      <SidebarItem
                        key={value}
                        icon={<Icon />}
                        activeIcon={<Icon weight="fill" />}
                        isActive={selected}
                        variant="toggle"
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            setTheme(value);
                            close();
                          }}
                        >
                          {tLayout(`sidebar.theme_options.${value}`)}
                        </button>
                      </SidebarItem>
                    );
                  })}

                  <p className="text-greyDark px-2.5 pt-2 pb-1 text-xs font-semibold">
                    {tLayout('sidebar.language')}
                  </p>
                  <SidebarItem
                    icon={<span className="text-base font-bold">가</span>}
                    isActive={i18n.language === 'ko'}
                    variant="toggle"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={i18n.language === 'ko'}
                      onClick={() => {
                        i18n.changeLanguage('ko');
                        close();
                      }}
                    >
                      한국어
                    </button>
                  </SidebarItem>
                  <SidebarItem
                    icon={<span className="text-base font-bold">A</span>}
                    isActive={i18n.language === 'en'}
                    variant="toggle"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={i18n.language === 'en'}
                      onClick={() => {
                        i18n.changeLanguage('en');
                        close();
                      }}
                    >
                      English
                    </button>
                  </SidebarItem>

                  <div className="bg-greyLight dark:bg-dark_greyBorder my-1 h-px" />
                  <LogClick eventName={LogEvents.myClickBugReport}>
                    <SidebarItem icon={<FlagIcon />}>
                      <CSLink
                        onClick={() => {
                          close();
                          onClose?.();
                        }}
                      >
                        {tAuth('mypage.feedback')}
                      </CSLink>
                    </SidebarItem>
                  </LogClick>
                </Popover.Body>
              )}
            </Popover.Content>
          </Popover.Menu>
        </li>

        <li>
          {user ? (
            <ProfileModalButton
              triggerClassName={cn(sidebarRowClass, 'cursor-pointer')}
              eventName={LogEvents.sidebarClickProfile}
              imageClassName="size-5 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-dark_dark"
              labelClassName={cn('font-normal', labelClass)}
            />
          ) : (
            <LogClick eventName={LogEvents.sidebarClickProfile}>
              <SidebarItem icon={<UserIcon />} labelClassName={labelClass}>
                <Link to="/" onClick={onClose}>
                  {tLayout('navbar.login')}
                </Link>
              </SidebarItem>
            </LogClick>
          )}
        </li>
      </ul>
    </div>
  );
};
