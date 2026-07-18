import { type ReactNode, useLayoutEffect, useState } from 'react';

import { Link } from '@tanstack/react-router';

import {
  ArrowSquareOutIcon,
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
  Dialog,
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

const PROFILE_TRIGGER_ATTR = 'data-profile-trigger';

function isElementVisible(el: HTMLElement) {
  if (!el.isConnected) return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/** 현재 레이아웃에서 실제로 보이는 프로필 트리거만 (모바일 숨김 버튼 제외) */
function findVisibleProfileTrigger(): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(
    `[${PROFILE_TRIGGER_ATTR}]`,
  );
  for (const el of nodes) {
    if (isElementVisible(el)) return el;
  }
  return null;
}

interface ProfileModalPanelProps {
  user: User;
  onClose: () => void;
  onSignOut: () => void;
  onWithdrawal: () => void;
  className?: string;
  /** 모바일: 내 공지·설정 (PC는 사이드바) */
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
      <div
        className={cn(
          'relative flex flex-col items-center gap-0.5 md:py-5',
          showMobileNav ? 'pt-4 pb-8' : 'pt-1 pb-4',
        )}
      >
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

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onExitComplete: () => void;
  anchor: HTMLElement;
  user: User;
  onSignOut: () => void;
  onWithdrawal: () => void;
}

/** 뷰포트에 따라 팝오버 ↔ 풀스크린을 실시간 전환 */
function ProfileOverlay({
  isOpen,
  onClose,
  onExitComplete,
  anchor: _anchor,
  user,
  onSignOut,
  onWithdrawal,
}: ProfileOverlayProps) {
  const isDesktop = useIsDesktop();
  // 모바일에서 연 앵커는 PC에서 숨겨지므로 절대 재사용하지 않음
  const [desktopAnchor, setDesktopAnchor] = useState<HTMLElement | null>(null);
  const resolvedDesktopAnchor = isDesktop ? desktopAnchor : null;

  useLayoutEffect(() => {
    if (!isOpen || !isDesktop) return;

    let cancelled = false;
    let frames = 0;

    const tick = () => {
      if (cancelled) return;
      const next = findVisibleProfileTrigger();
      if (next) {
        setDesktopAnchor(next);
        return;
      }
      frames += 1;
      if (frames < 24) {
        requestAnimationFrame(tick);
        return;
      }
      onClose();
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [isDesktop, isOpen, onClose]);

  // 셸 전환 시 exit 애니메이션이 overlay를 내리지 않도록, 실제 닫힐 때만 unmount
  const handleExitComplete = () => {
    if (!isOpen) {
      setDesktopAnchor(null);
      onExitComplete();
    }
  };

  const panel = (
    <ProfileModalPanel
      user={user}
      onClose={onClose}
      onSignOut={onSignOut}
      onWithdrawal={onWithdrawal}
      showMobileNav={!isDesktop}
      className={
        isDesktop
          ? undefined
          : 'w-full max-w-none rounded-none border-none px-5 pt-12 pb-10 shadow-none'
      }
    />
  );

  if (isDesktop) {
    // 보이는 PC 트리거를 잡을 때까지 팝오버를 그리지 않음 (숨은 모바일 앵커로 뜨는 것 방지)
    if (!resolvedDesktopAnchor) return null;

    return (
      <Popover.Root
        isOpen={isOpen}
        onClose={onClose}
        onExitComplete={handleExitComplete}
        anchor={resolvedDesktopAnchor}
        placement="top-start"
      >
        {panel}
      </Popover.Root>
    );
  }

  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onClose}
      onExitComplete={handleExitComplete}
      size="full"
      closeOnBackdrop={false}
      className="mx-0 box-border h-dvh max-h-dvh w-screen max-w-[100vw] gap-0 overflow-x-hidden overflow-y-auto p-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-none"
    >
      {/* Body 기본 -mr-5/pr-5는 패딩 있는 다이얼로그용 → 풀스크린에선 가로 넘침 */}
      <Dialog.Body className="mr-0 overflow-y-auto px-0">{panel}</Dialog.Body>
    </Dialog.Root>
  );
}

interface ProfileModalButtonProps {
  triggerClassName?: string;
  eventName?: string;
  labelClassName?: string;
  imageClassName?: string;
  showName?: boolean;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const ProfileModalButton = ({
  triggerClassName = 'hidden cursor-pointer items-center justify-center gap-3 md:flex',
  eventName = LogEvents.navBarClickMyPage,
  labelClassName,
  imageClassName = 'size-9',
  showName = true,
  children,
  onOpenChange,
}: ProfileModalButtonProps = {}) => {
  const { t } = useTranslation('auth');
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { mutateAsync: withdraw } = useWithdraw();

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

    onOpenChange?.(true);

    overlay.open(({ isOpen, close, unmount }) => {
      const handleClose = () => {
        onOpenChange?.(false);
        close();
      };

      return (
        <ProfileOverlay
          isOpen={isOpen}
          onClose={handleClose}
          onExitComplete={unmount}
          anchor={anchor}
          user={user}
          onSignOut={() => {
            logout({});
            handleClose();
          }}
          onWithdrawal={async () => {
            handleClose();
            await handleWithdrawal();
          }}
        />
      );
    });
  };

  return (
    <LogClick eventName={eventName}>
      <button
        type="button"
        data-profile-trigger
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
