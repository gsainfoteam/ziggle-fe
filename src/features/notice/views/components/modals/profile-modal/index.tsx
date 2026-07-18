import { type ReactNode, useState } from 'react';

import { Link } from '@tanstack/react-router';

import {
  ArrowSquareOutIcon,
  BookmarkSimpleIcon,
  GearSixIcon,
  SignOutIcon,
  UserCircleIcon,
  UserListIcon,
  UserMinusIcon,
  XIcon,
} from '@phosphor-icons/react';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import DefaultProfileIcon from '@/assets/icons/default-profile.svg?react';
import {
  Avatar,
  Drawer,
  LogClick,
  Popover,
  confirmDialog,
} from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useTheme } from '@/common/lib/theme';
import { cn, useIsDesktop } from '@/common/utils';
import { useLogout, useUser, useWithdraw } from '@/features/auth';
import type { User } from '@/features/auth/models';

import { SidebarItem } from '../../layout/sidebar/sidebar-item';

interface ProfileModalPanelProps {
  user: User;
  onClose: () => void;
  onSignOut: () => void;
  onWithdrawal: () => void;
  className?: string;
  /** 모바일 시트: 북마크·내 공지·설정 진입 */
  showMobileNav?: boolean;
}

export const ProfileModalPanel = ({
  user,
  onClose,
  onSignOut,
  onWithdrawal,
  className,
  showMobileNav = false,
}: ProfileModalPanelProps) => {
  const { t } = useTranslation('auth');
  const { t: tNotice } = useTranslation('notice');
  const { t: tLayout, i18n } = useTranslation('layout');
  const { theme, setTheme, themeOptions } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const rowClass =
    'bg-muted hover:bg-border flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors';

  return (
    <div
      className={cn(
        'bg-background w-72 rounded-2xl border border-transparent p-4 shadow-2xl md:p-5',
        className,
      )}
    >
      <div className="relative flex flex-col items-center gap-0.5 pt-1 pb-4 md:py-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 cursor-pointer"
        >
          <XIcon className="text-muted-foreground size-5" />
        </button>

        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="mb-2 size-20 rounded-full md:mb-2 md:size-16"
          />
        ) : (
          <DefaultProfileIcon className="mb-2 size-20 md:mb-2 md:size-16" />
        )}

        <div className="text-foreground text-xl font-semibold md:text-xl">
          {user.name}
        </div>
        <div className="text-primary text-sm">{user.email}</div>
      </div>

      <div className="flex flex-col gap-2">
        {showMobileNav && (
          <>
            <Link to="/bookmarked" onClick={onClose} className={rowClass}>
              <BookmarkSimpleIcon className="text-foreground size-5" />
              <span className="text-foreground flex-1 text-sm font-medium">
                {tNotice('sidebar.bookmark_notice')}
              </span>
            </Link>
            <Link to="/my" onClick={onClose} className={rowClass}>
              <UserListIcon className="text-foreground size-5" />
              <span className="text-foreground flex-1 text-sm font-medium">
                {tNotice('sidebar.my_notice')}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setSettingsOpen((v) => !v)}
              className={cn(rowClass, 'w-full cursor-pointer')}
            >
              <GearSixIcon className="text-foreground size-5" />
              <span className="text-foreground flex-1 text-left text-sm font-medium">
                {tLayout('sidebar.settings')}
              </span>
            </button>
            {settingsOpen && (
              <div className="flex flex-col gap-y-0.5 px-1 pb-1">
                <p className="text-muted-foreground px-2.5 pt-1 pb-1 text-xs font-semibold">
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
                        onClick={() => setTheme(value)}
                      >
                        {tLayout(`sidebar.theme_options.${value}`)}
                      </button>
                    </SidebarItem>
                  );
                })}
                <p className="text-muted-foreground px-2.5 pt-2 pb-1 text-xs font-semibold">
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
                    onClick={() => i18n.changeLanguage('ko')}
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
                    onClick={() => i18n.changeLanguage('en')}
                  >
                    English
                  </button>
                </SidebarItem>
              </div>
            )}
          </>
        )}

        <a
          href="https://account.gistory.me"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={rowClass}
        >
          <UserCircleIcon className="text-foreground size-5" />
          <span className="text-foreground flex-1 text-sm font-medium">
            {t('mypage.manage')}
          </span>
          <ArrowSquareOutIcon className="text-muted-foreground size-4" />
        </a>

        <LogClick eventName={LogEvents.myClickLogout}>
          <button
            type="button"
            onClick={onSignOut}
            className={cn(rowClass, 'w-full cursor-pointer')}
          >
            <SignOutIcon className="text-foreground size-5" />
            <span className="text-foreground text-sm font-medium">
              {t('mypage.logout')}
            </span>
          </button>
        </LogClick>

        <LogClick eventName={LogEvents.myClickUnregister}>
          <button
            type="button"
            onClick={onWithdrawal}
            className={cn(rowClass, 'w-full cursor-pointer')}
          >
            <UserMinusIcon className="text-foreground size-5" />
            <span className="text-foreground text-sm font-medium">
              {t('mypage.quit')}
            </span>
          </button>
        </LogClick>
      </div>
    </div>
  );
};

interface ProfileModalButtonProps {
  triggerClassName?: string;
  eventName?: string;
  labelClassName?: string;
  imageClassName?: string;
  showName?: boolean;
  children?: ReactNode;
}

export const ProfileModalButton = ({
  triggerClassName = 'hidden cursor-pointer items-center justify-center gap-3 md:flex',
  eventName = LogEvents.navBarClickMyPage,
  labelClassName,
  imageClassName = 'size-9',
  showName = true,
  children,
}: ProfileModalButtonProps = {}) => {
  const { t } = useTranslation('auth');
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { mutateAsync: withdraw } = useWithdraw();
  const isDesktop = useIsDesktop();

  const handleWithdrawal = async () => {
    try {
      const confirmed = await confirmDialog({
        title: t('mypage.withdrawal.confirm.title'),
        description: t('mypage.withdrawal.confirm.text'),
        destructive: true,
      });
      if (!confirmed) return;
      try {
        await withdraw({});
        toast.success(
          t('mypage.withdrawal.success.title') +
            '\n' +
            t('mypage.withdrawal.success.text'),
        );
        logout({});
      } catch {
        toast.error(
          t('mypage.withdrawal.error.title') +
            '\n' +
            t('mypage.withdrawal.error.text'),
        );
      }
    } catch (err) {
      toast.error(
        t('mypage.withdrawal.error.title') +
          '\n' +
          t('mypage.withdrawal.error.text'),
      );
      console.error('withdrawal flow error:', err);
    }
  };

  const openProfile = (anchor: HTMLElement) => {
    if (!user) return;

    const panel = (close: () => void) => (
      <ProfileModalPanel
        user={user}
        onClose={close}
        onSignOut={() => {
          logout({});
          close();
        }}
        onWithdrawal={async () => {
          close();
          await handleWithdrawal();
        }}
        showMobileNav={!isDesktop}
        className={
          isDesktop
            ? undefined
            : 'w-full max-w-none rounded-none border-none p-4 shadow-none'
        }
      />
    );

    if (isDesktop) {
      overlay.open(({ isOpen, close, unmount }) => (
        <Popover.Root
          isOpen={isOpen}
          onClose={close}
          onExitComplete={unmount}
          anchor={anchor}
          placement="bottom-end"
        >
          {panel(close)}
        </Popover.Root>
      ));
      return;
    }

    overlay.open(({ isOpen, close, unmount }) => (
      <Drawer.Root
        isOpen={isOpen}
        onClose={close}
        onExitComplete={unmount}
        side="bottom"
        size="large"
        className="gap-0 p-0 pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <Drawer.Body className="overflow-y-auto px-0">
          {panel(close)}
        </Drawer.Body>
      </Drawer.Root>
    ));
  };

  return (
    <LogClick eventName={eventName}>
      <button
        type="button"
        onClick={(event) => openProfile(event.currentTarget)}
        className={triggerClassName}
      >
        <Avatar
          name={showName ? user?.name : undefined}
          picture={user?.picture}
          imageClassName={imageClassName}
          labelClassName={labelClassName}
        />
        {children}
      </button>
    </LogClick>
  );
};
