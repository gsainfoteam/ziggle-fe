import { useEffect, useState } from 'react';

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { LogOut, OpenNewWindow, ProfileCircle, UserXmark } from 'iconoir-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import CloseIcon from '@/assets/icons/close.svg?react';
import DefaultProfileIcon from '@/assets/icons/default-profile.svg?react';
import { Avatar, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useLogout, useUser, useWithdraw } from '@/features/auth';
import type { User } from '@/features/auth/models';

interface ProfileModalPanelProps {
  user: User;
  onClose: () => void;
  onSignOut: () => void;
  onWithdrawal: () => void;
  className?: string;
}

export const ProfileModalPanel = ({
  user,
  onClose,
  onSignOut,
  onWithdrawal,
  className,
}: ProfileModalPanelProps) => {
  const { t } = useTranslation('auth');

  return (
    <div
      className={cn(
        'dark:bg-dark_dark dark:border-dark_greyBorder w-72 rounded-2xl border border-transparent bg-white p-5 shadow-2xl',
        className,
      )}
    >
      <div className="relative flex flex-col items-center gap-1 py-8 md:py-5">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 cursor-pointer"
        >
          <CloseIcon className="stroke-greyDark dark:stroke-dark_grey h-5 w-5" />
        </button>

        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="mb-3 size-28 rounded-full md:mb-2 md:size-16"
          />
        ) : (
          <DefaultProfileIcon className="mb-3 size-28 md:mb-2 md:size-16" />
        )}

        <div className="text-text dark:text-dark_white text-2xl font-semibold md:text-xl">
          {user.name}
        </div>
        <div className="text-primary text-base md:text-sm">{user.email}</div>
      </div>

      <div className="flex flex-col gap-3 md:gap-2">
        <a
          href="https://account.gistory.me"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex items-center gap-3 rounded-xl px-4 py-4 transition-colors md:py-3"
        >
          <ProfileCircle className="text-text dark:text-dark_white size-6 md:size-5" />
          <span className="text-text dark:text-dark_white flex-1 text-base font-medium md:text-sm">
            {t('mypage.manage')}
          </span>
          <OpenNewWindow className="text-greyDark dark:text-dark_grey size-5 md:size-4" />
        </a>

        <LogClick eventName={LogEvents.myClickLogout}>
          <button
            onClick={onSignOut}
            className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-4 transition-colors md:py-3"
          >
            <LogOut className="text-text dark:text-dark_white size-6 md:size-5" />
            <span className="text-text dark:text-dark_white text-base font-medium md:text-sm">
              {t('mypage.logout')}
            </span>
          </button>
        </LogClick>

        <LogClick eventName={LogEvents.myClickUnregister}>
          <button
            onClick={onWithdrawal}
            className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-4 transition-colors md:py-3"
          >
            <UserXmark className="text-text dark:text-dark_white size-6 md:size-5" />
            <span className="text-text dark:text-dark_white text-base font-medium md:text-sm">
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
}

export const ProfileModalButton = ({
  triggerClassName = 'hidden cursor-pointer items-center justify-center gap-3 md:flex',
  eventName = LogEvents.navBarClickMyPage,
}: ProfileModalButtonProps = {}) => {
  const { t } = useTranslation('auth');
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { mutateAsync: withdraw } = useWithdraw();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: !isMobile,
    escapeKey: true,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleSignOut = () => {
    logout({});
    setIsOpen(false);
  };

  const handleWithdrawal = async () => {
    try {
      const result = confirm(
        t('mypage.withdrawal.confirm.title') +
          '\n' +
          t('mypage.withdrawal.confirm.text'),
      );

      if (result) {
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
      }
    } catch (err) {
      console.error('withdrawal flow error:', err);
    }
  };

  const panel = user && (
    <ProfileModalPanel
      user={user}
      onClose={() => setIsOpen(false)}
      onSignOut={handleSignOut}
      onWithdrawal={handleWithdrawal}
      className={
        isMobile ? 'w-full rounded-none border-none shadow-none' : undefined
      }
    />
  );

  return (
    <>
      <LogClick eventName={eventName}>
        <button
          ref={setReference}
          {...getReferenceProps()}
          className={triggerClassName}
        >
          <Avatar
            name={user?.name}
            picture={user?.picture}
            imageClassName="size-9"
          />
        </button>
      </LogClick>

      {isMobile ? (
        isOpen &&
        ReactDOM.createPortal(
          <div className="dark:bg-dark_dark fixed inset-0 z-1001 overflow-y-auto bg-white">
            {panel}
          </div>,
          document.body,
        )
      ) : (
        <div
          ref={setFloating}
          style={{ ...floatingStyles, zIndex: 1000 }}
          className={isOpen ? '' : 'hidden'}
          {...getFloatingProps()}
        >
          {panel}
        </div>
      )}
    </>
  );
};
