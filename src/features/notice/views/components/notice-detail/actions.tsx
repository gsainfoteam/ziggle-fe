import { useState } from 'react';

import { Bookmark, BookmarkSolid, Copy, ShareIos } from 'iconoir-react';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import AnguishedFace from '@/assets/icons/anguished-face.svg?react';
import FireActivated from '@/assets/icons/fire-activated.svg?react';
import Fire from '@/assets/icons/fire-outlined.svg?react';
import LoudlyCryingFace from '@/assets/icons/loudly-crying-face.svg?react';
import SurprisedFace from '@/assets/icons/surprised-face-with-open-mouth.svg?react';
import ThinkingFace from '@/assets/icons/thinking-face.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { EmojiString, type Reaction } from '@/features/notice/models';
import {
  useAddReaction,
  useDeleteReaction,
  useToggleBookmark,
} from '@/features/notice/viewmodels';

const EMOJI_WIDTH = 28;

// TODO: 사이드 바 아이템 디자인 및 간격 수정
// TODO: 북마크반 모아서 보는 페이지
// TODO: 지글 로고 위치 좀 더 안정적인 곳으로

const emojis: Record<EmojiString, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [EmojiString.FIRE]: Fire,
  [EmojiString.CRYING]: LoudlyCryingFace,
  [EmojiString.ANGUISHED]: AnguishedFace,
  [EmojiString.THINKING]: ThinkingFace,
  [EmojiString.SURPRISED]: SurprisedFace,
};

interface ActionButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton = ({ isSelected, onClick, children }: ActionButtonProps) => (
  <button
    className={cn(
      'flex h-10 items-center gap-1.75 rounded-full border-none px-3.25 py-1.25 transition outline-none',
      isSelected
        ? 'bg-text dark:bg-dark_white dark:text-dark_dark text-white'
        : 'bg-greyLight dark:bg-dark_greyDark text-text dark:text-dark_white',
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const ReactionButton = ({
  emoji,
  count,
  isReacted,
  onClick,
}: Reaction & { onClick: () => void }) => {
  const EmojiComponent = emojis[emoji as keyof typeof emojis];
  const isFire = emoji === EmojiString.FIRE;

  return (
    <ActionButton isSelected={isFire ? false : isReacted} onClick={onClick}>
      <span>
        {isFire ? (
          isReacted ? (
            <FireActivated width={EMOJI_WIDTH} />
          ) : (
            <span className="stroke-text dark:stroke-dark_white stroke-2">
              <Fire width={EMOJI_WIDTH} />
            </span>
          )
        ) : EmojiComponent ? (
          <EmojiComponent width={EMOJI_WIDTH} />
        ) : (
          <p>{emoji}</p>
        )}
      </span>
      <span className="text-base">{count}</span>
    </ActionButton>
  );
};

interface NoticeDetailActionsProps {
  id: number;
  title: string;
  reactions: Reaction[];
  isBookmarked: boolean;
}

export const NoticeDetailActions = ({
  id,
  title,
  reactions,
  isBookmarked: initialBookmarked,
}: NoticeDetailActionsProps) => {
  const [currentReactions, setCurrentReactions] =
    useState<Reaction[]>(reactions);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const { mutateAsync: deleteReaction } = useDeleteReaction();
  const { mutateAsync: addReaction } = useAddReaction();
  const { mutateAsync: toggleBookmark } = useToggleBookmark();

  const handleEmojiClick = async (emoji: string, isReacted: boolean) => {
    try {
      const fn = isReacted ? deleteReaction : addReaction;
      const res = await fn({ params: { path: { id } }, body: { emoji } });
      setCurrentReactions(res.reactions);
    } catch {
      toast.error('로그인이 필요합니다.');
    }
  };

  const handleBookmarkClick = async () => {
    try {
      await toggleBookmark({
        params: { path: { id } },
        body: { bookmarked: !bookmarked },
      });
      setBookmarked((prev) => !prev);
    } catch {
      toast.error('로그인이 필요합니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {Object.keys(emojis).map((emoji) => {
          const reaction = currentReactions.find((r) => r.emoji === emoji);
          return (
            <ReactionButton
              key={emoji}
              emoji={emoji}
              count={reaction?.count ?? 0}
              isReacted={reaction?.isReacted ?? false}
              onClick={() =>
                handleEmojiClick(emoji, reaction?.isReacted ?? false)
              }
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton isSelected={bookmarked} onClick={handleBookmarkClick}>
          {bookmarked ? (
            <BookmarkSolid className="size-7" />
          ) : (
            <Bookmark className="size-7" />
          )}
          <span className="text-base">저장</span>
        </ActionButton>

        <LogClick eventName={LogEvents.detailClickShare} properties={{ id }}>
          <ShareButton title={title} />
        </LogClick>

        <LogClick eventName={LogEvents.detailClickCopyLink} properties={{ id }}>
          <CopyLinkButton title={title} />
        </LogClick>
      </div>
    </div>
  );
};

const ShareButton = ({ title }: { title: string }) => {
  const { t } = useTranslation('notice');
  const handleShare = () => {
    if (!navigator.canShare) return toast.error(t('detail.share.unsupported'));
    navigator.share({
      title,
      text: t('detail.share.content', { title }),
      url: window.location.href,
    });
  };
  return (
    <ActionButton isSelected={false} onClick={handleShare}>
      <ShareIos className="size-7" />
      <span className="text-base">{t('detail.share.action')}</span>
    </ActionButton>
  );
};

const CopyLinkButton = ({ title }: { title: string }) => {
  const { t } = useTranslation('notice');
  const handleCopy = () => {
    navigator.clipboard.writeText(
      t('detail.copy_link.content', { title, link: window.location.href }),
    );
    toast.success(
      <div className="flex flex-col text-sm font-medium">
        <Trans t={t} i18nKey="detail.copy_link.success">
          succeeded <div className="text-xs">share to friends</div>
        </Trans>
      </div>,
    );
  };
  return (
    <ActionButton isSelected={false} onClick={handleCopy}>
      <Copy className="size-7" />
      <span className="text-base">{t('detail.copy_link.action')}</span>
    </ActionButton>
  );
};
