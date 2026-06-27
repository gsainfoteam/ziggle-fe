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

export const Sidebar = ({ onClose }: { onClose?: () => void } = {}) => {
  const { pathname } = useLocation();
  const { t: tLayout, i18n } = useTranslation('layout');
  const { t: tAuth } = useTranslation('auth');
  const { data: user } = useUser();
  const { theme, setTheme, themeOptions } = useTheme();
  const nav = useNoticeNav();

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
        >
          <Link {...item.link} onClick={onClose}>
            {item.title}
          </Link>
        </SidebarItem>
      </LogClick>
    </li>
  );

  return (
    <div className="flex flex-1 flex-col gap-y-5">
      {/* 피드 그룹 — 기본 페이지인 '최근'을 맨 위로, 검색은 그 다음 */}
      <ul className="flex flex-col gap-y-0.5">
        {renderNavRow('recent', nav.feeds.recent)}
        {renderNavRow('search', nav.search)}
        {Object.entries(nav.feeds)
          .filter(([key]) => key !== 'recent')
          .map(([key, item]) => renderNavRow(key.toLowerCase(), item))}
      </ul>

      {/* 카테고리 그룹 */}
      <ul className="flex flex-col gap-y-0.5">
        {Object.entries(nav.categories).map(([key, item]) =>
          renderNavRow(key.toLowerCase(), item),
        )}
      </ul>

      {/* 하단: 설정 + 프로필 — 뷰포트 바닥에 고정 */}
      <ul className="mt-auto flex flex-col gap-y-0.5">
        {/* 설정 — 테마·언어·피드백을 한 메뉴로 (중첩 팝오버 불가라 인라인 섹션) */}
        <li>
          <Popover.Menu>
            <Popover.Trigger>
              {(open) => (
                <SidebarItem
                  icon={<GearSixIcon />}
                  activeIcon={<GearSixIcon weight="fill" />}
                  isActive={open}
                  variant="toggle"
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
                  {/* 테마 */}
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

                  {/* 언어 */}
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

                  {/* 피드백 */}
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

        {/* 프로필 */}
        <li>
          {user ? (
            <ProfileModalButton
              triggerClassName={cn(sidebarRowClass, 'cursor-pointer')}
              eventName={LogEvents.sidebarClickProfile}
              imageClassName="size-5"
              labelClassName="font-normal"
            />
          ) : (
            <LogClick eventName={LogEvents.sidebarClickProfile}>
              <SidebarItem icon={<UserIcon />}>
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
