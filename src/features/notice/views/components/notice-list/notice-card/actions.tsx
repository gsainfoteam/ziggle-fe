import { useState } from 'react';

import { BookmarkSimpleIcon, ShareFatIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn, shareOrCopy } from '@/common/utils';
import { EmojiString, type Notice } from '@/features/notice/models';
import {
  useAddReaction,
  useDeleteReaction,
  useToggleBookmark,
} from '@/features/notice/viewmodels';

import { FlameReactionIcon } from '../../flame-reaction-icon';

interface FireState {
  count: number;
  isReacted: boolean;
}

export interface NoticeCardActionsDisplayProps {
  id: number;
  fire: FireState;
  isBookmarked: boolean;
  onFireToggle: (isReacted: boolean) => Promise<FireState>;
  onBookmarkToggle: (bookmarked: boolean) => Promise<void>;
  onShare: () => void;
}

export const NoticeCardActionsDisplay = ({
  id,
  fire: initialFire,
  isBookmarked: initialBookmarked,
  onFireToggle,
  onBookmarkToggle,
  onShare,
}: NoticeCardActionsDisplayProps) => {
  const { t } = useTranslation('notice');
  const [currentFire, setCurrentFire] = useState<FireState>(initialFire);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleFireClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const next = await onFireToggle(currentFire.isReacted);
      setCurrentFire(next);
    } catch {
      toast.error(t('search.login_required'));
    }
  };

  const handleBookmarkClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      await onBookmarkToggle(!bookmarked);
      setBookmarked((prev) => !prev);
    } catch {
      toast.error(t('search.login_required'));
    }
  };

  return (
    <div className="flex items-center justify-between">
      <LogClick
        eventName={LogEvents.noticeClickReaction}
        properties={{ id, emoji: EmojiString.FIRE }}
      >
        <div className="flex items-center gap-1">
          <Button
            type="button"
            animated
            onClick={handleFireClick}
            className="flex cursor-pointer items-center"
          >
            <FlameReactionIcon
              active={currentFire.isReacted}
              className="size-6"
            />
          </Button>
          <span
            className={cn(
              'text-sm font-semibold',
              currentFire.isReacted
                ? 'text-primary'
                : 'text-text dark:text-dark_white',
            )}
          >
            {currentFire.count}
          </span>
        </div>
      </LogClick>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          animated
          onClick={handleBookmarkClick}
          className="flex cursor-pointer items-center"
        >
          {bookmarked ? (
            <BookmarkSimpleIcon weight="fill" className="text-primary size-6" />
          ) : (
            <BookmarkSimpleIcon className="text-text dark:text-dark_white size-6" />
          )}
        </Button>

        <LogClick eventName={LogEvents.noticeClickShare} properties={{ id }}>
          <Button
            type="button"
            animated
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShare();
            }}
            className="flex cursor-pointer items-center"
          >
            <ShareFatIcon className="text-text dark:text-dark_white size-6" />
          </Button>
        </LogClick>
      </div>
    </div>
  );
};

interface NoticeCardActionsProps {
  id: number;
  title: string;
  reactions: Notice['reactions'];
  isBookmarked: boolean;
}

export const NoticeCardActions = ({
  id,
  title,
  reactions,
  isBookmarked,
}: NoticeCardActionsProps) => {
  const { t } = useTranslation('notice');
  const { mutateAsync: addReaction } = useAddReaction();
  const { mutateAsync: deleteReaction } = useDeleteReaction();
  const { mutateAsync: toggleBookmark } = useToggleBookmark();

  const fire = reactions.find(({ emoji }) => emoji === EmojiString.FIRE) ?? {
    emoji: EmojiString.FIRE,
    count: 0,
    isReacted: false,
  };

  const handleFireToggle = async (isReacted: boolean) => {
    const fn = isReacted ? deleteReaction : addReaction;
    const res = await fn({
      params: { path: { id } },
      body: { emoji: EmojiString.FIRE },
    });
    const fireReaction = res.reactions.find(
      ({ emoji }) => emoji === EmojiString.FIRE,
    );
    return fireReaction ?? { count: 0, isReacted: false };
  };

  const handleBookmarkToggle = async (bookmarked: boolean): Promise<void> => {
    await toggleBookmark({ params: { path: { id } }, body: { bookmarked } });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/notice/${id}`;
    const result = await shareOrCopy({
      title,
      text: t('detail.share.content', { title }),
      url,
      copyText: t('detail.copy_link.content', { title, link: url }),
    });

    if (result === 'copied') {
      toast.success(
        <div className="flex flex-col text-sm font-medium">
          <span>{t('detail.copy_link.success')}</span>
          <span className="text-xs font-normal">
            {t('detail.copy_link.success_hint')}
          </span>
        </div>,
      );
      return;
    }

    if (result === 'unsupported') {
      toast.error(t('detail.share.unsupported'));
    }
  };

  return (
    <NoticeCardActionsDisplay
      id={id}
      fire={fire}
      isBookmarked={isBookmarked}
      onFireToggle={handleFireToggle}
      onBookmarkToggle={handleBookmarkToggle}
      onShare={handleShare}
    />
  );
};
