import { LogOut, OpenNewWindow, ProfileCircle, UserXmark } from 'iconoir-react';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import CloseIcon from '@/assets/icons/close.svg?react';
import DefaultProfileIcon from '@/assets/icons/default-profile.svg?react';
import { Avatar, LogClick, Popover, confirmDialog } from '@/common/components';
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
      console.error('withdrawal flow error:', err);
    }
  };

  const openProfilePopover = (anchor: HTMLElement) => {
    if (!user) return;
    overlay.open(({ isOpen, close, unmount }) => (
      <Popover.Root
        isOpen={isOpen}
        onClose={close}
        onExitComplete={unmount}
        anchor={anchor}
        placement="bottom-end"
        responsive
        className="md:w-auto max-md:h-full max-md:max-h-none max-md:w-full max-md:max-w-none"
      >
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
          className="md:rounded-2xl md:border-transparent md:shadow-2xl max-md:h-full max-md:w-full max-md:rounded-none max-md:border-none max-md:shadow-none"
        />
      </Popover.Root>
    ));
  };

  return (
    <LogClick eventName={eventName}>
      <button
        type="button"
        onClick={(event) => openProfilePopover(event.currentTarget)}
        className={triggerClassName}
      >
        <Avatar
          name={user?.name}
          picture={user?.picture}
          imageClassName="size-9"
        />
      </button>
    </LogClick>
  );
};
