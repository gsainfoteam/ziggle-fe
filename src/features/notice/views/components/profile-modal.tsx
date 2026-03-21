import { useState } from 'react';

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
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import AccountIcon from '@/assets/icons/account.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import DefaultProfileIcon from '@/assets/icons/default-profile.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useLogout, useUser, useWithdraw } from '@/features/auth';
import type { User } from '@/features/auth/models';

interface ProfileModalPanelProps {
  user: User;
  onClose: () => void;
  onSignOut: () => void;
  onWithdrawal: () => void;
}

export const ProfileModalPanel = ({
  user,
  onClose,
  onSignOut,
  onWithdrawal,
}: ProfileModalPanelProps) => {
  const { t } = useTranslation('auth');

  return (
    <div className="dark:bg-dark_dark dark:border-dark_greyBorder w-72 rounded-2xl border border-transparent bg-white p-5 shadow-2xl">
      <div className="relative flex flex-col items-center gap-1 pt-5 pb-4">
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
            className="mb-2 size-16 rounded-full"
          />
        ) : (
          <DefaultProfileIcon className="mb-2 size-16" />
        )}

        <div className="text-text dark:text-dark_white text-xl font-semibold">
          {user.name}
        </div>
        <div className="text-primary text-sm">{user.email}</div>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href="https://account.gistory.me"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex items-center gap-3 rounded-xl px-4 py-3 transition-colors"
        >
          <ProfileCircle className="text-text dark:text-dark_white size-5" />
          <span className="text-text dark:text-dark_white flex-1 font-medium">
            {t('mypage.manage')}
          </span>
          <OpenNewWindow className="text-greyDark dark:text-dark_grey size-4" />
        </a>

        <LogClick eventName={LogEvents.myClickLogout}>
          <button
            onClick={onSignOut}
            className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors"
          >
            <LogOut className="text-text dark:text-dark_white size-5" />
            <span className="text-text dark:text-dark_white font-medium">
              {t('mypage.logout')}
            </span>
          </button>
        </LogClick>

        <LogClick eventName={LogEvents.myClickUnregister}>
          <button
            onClick={onWithdrawal}
            className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors"
          >
            <UserXmark className="text-text dark:text-dark_white size-5" />
            <span className="text-text dark:text-dark_white font-medium">
              {t('mypage.quit')}
            </span>
          </button>
        </LogClick>
      </div>
    </div>
  );
};

export const ProfileModal = () => {
  const { t } = useTranslation('auth');
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { mutateAsync: withdraw } = useWithdraw();

  const [isOpen, setIsOpen] = useState(false);

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
  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
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

  return (
    <>
      <LogClick eventName={LogEvents.navBarClickMyPage}>
        <button
          ref={setReference}
          {...getReferenceProps()}
          className="hidden cursor-pointer items-center justify-center gap-2 md:flex"
        >
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="outline-primary flex h-6 w-6 rounded-full outline-[1.5px]"
            />
          ) : (
            <AccountIcon className="flex h-6" />
          )}
          <div className="text-primary align-middle font-medium whitespace-nowrap">
            {user?.name}
          </div>
        </button>
      </LogClick>

      <div
        ref={setFloating}
        style={{ ...floatingStyles, zIndex: 1000 }}
        className={isOpen ? '' : 'hidden'}
        {...getFloatingProps()}
      >
        {user && (
          <ProfileModalPanel
            user={user}
            onClose={() => setIsOpen(false)}
            onSignOut={handleSignOut}
            onWithdrawal={handleWithdrawal}
          />
        )}
      </div>
    </>
  );
};
