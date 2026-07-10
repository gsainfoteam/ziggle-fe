import { createContext, useContext, useState, type ReactNode } from 'react';

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

const EMOJI_WIDTH_INLINE = 28;
const EMOJI_WIDTH_RAIL = 24;

const emojis: Record<EmojiString, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [EmojiString.FIRE]: Fire,
  [EmojiString.CRYING]: LoudlyCryingFace,
  [EmojiString.ANGUISHED]: AnguishedFace,
  [EmojiString.THINKING]: ThinkingFace,
  [EmojiString.SURPRISED]: SurprisedFace,
};

type ButtonVariant = 'inline' | 'rail';
type ActionsLayout = 'inline' | 'rail';

interface ActionsContextValue {
  id: number;
  title: string;
  currentReactions: Reaction[];
  bookmarked: boolean;
  handleEmojiClick: (emoji: string, isReacted: boolean) => Promise<void>;
  handleBookmarkClick: () => Promise<void>;
}

const NoticeDetailActionsContext = createContext<ActionsContextValue | null>(
  null,
);

function useNoticeDetailActionsContext() {
  const ctx = useContext(NoticeDetailActionsContext);
  if (!ctx) {
    throw new Error(
      'NoticeDetailActions must be used within NoticeDetailActionsProvider',
    );
  }
  return ctx;
}

export function NoticeDetailActionsProvider({
  id,
  title,
  reactions,
  isBookmarked: initialBookmarked,
  children,
}: {
  id: number;
  title: string;
  reactions: Reaction[];
  isBookmarked: boolean;
  children: ReactNode;
}) {
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
    <NoticeDetailActionsContext.Provider
      value={{
        id,
        title,
        currentReactions,
        bookmarked,
        handleEmojiClick,
        handleBookmarkClick,
      }}
    >
      {children}
    </NoticeDetailActionsContext.Provider>
  );
}

interface ActionButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  label?: string;
}

const ActionButton = ({
  isSelected,
  onClick,
  children,
  variant = 'inline',
  label,
}: ActionButtonProps) => (
  <button
    type="button"
    title={variant === 'rail' ? label : undefined}
    aria-label={variant === 'rail' ? label : undefined}
    className={cn(
      'border-none transition outline-none',
      variant === 'rail'
        ? cn(
            'flex size-10 flex-col items-center justify-center gap-0.5 rounded-xl',
            isSelected
              ? 'bg-text dark:bg-dark_white dark:text-dark_dark text-white'
              : 'text-text dark:text-dark_white hover:bg-greyLight dark:hover:bg-dark_greyDark',
          )
        : cn(
            'flex h-10 items-center gap-1.75 rounded-full px-3.25 py-1.25',
            isSelected
              ? 'bg-text dark:bg-dark_white dark:text-dark_dark text-white'
              : 'bg-greyLight dark:bg-dark_greyDark text-text dark:text-dark_white',
          ),
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const ReactionEmoji = ({
  emoji,
  isReacted,
  size,
}: {
  emoji: string;
  isReacted: boolean;
  size: number;
}) => {
  const EmojiComponent = emojis[emoji as keyof typeof emojis];
  const isFire = emoji === EmojiString.FIRE;

  if (isFire) {
    return isReacted ? (
      <FireActivated width={size} />
    ) : (
      <span className="stroke-text dark:stroke-dark_white stroke-2">
        <Fire width={size} />
      </span>
    );
  }

  if (EmojiComponent) return <EmojiComponent width={size} />;
  return <span>{emoji}</span>;
};

const ReactionButton = ({
  emoji,
  count,
  isReacted,
  onClick,
  variant = 'inline',
}: Reaction & { onClick: () => void; variant?: ButtonVariant }) => {
  const emojiSize = variant === 'rail' ? EMOJI_WIDTH_RAIL : EMOJI_WIDTH_INLINE;

  return (
    <ActionButton isSelected={isReacted} onClick={onClick} variant={variant}>
      <ReactionEmoji emoji={emoji} isReacted={isReacted} size={emojiSize} />
      <span
        className={cn(
          variant === 'rail'
            ? 'text-[10px] leading-none font-medium'
            : 'text-base',
        )}
      >
        {count}
      </span>
    </ActionButton>
  );
};

export function NoticeDetailActions({
  variant = 'inline',
  className,
}: {
  variant?: ActionsLayout;
  className?: string;
}) {
  const {
    id,
    title,
    currentReactions,
    bookmarked,
    handleEmojiClick,
    handleBookmarkClick,
  } = useNoticeDetailActionsContext();

  const bookmarkLabel = '저장';

  const reactionButtons = Object.keys(emojis).map((emoji) => {
    const reaction = currentReactions.find((r) => r.emoji === emoji);
    return (
      <ReactionButton
        key={emoji}
        emoji={emoji}
        count={reaction?.count ?? 0}
        isReacted={reaction?.isReacted ?? false}
        variant={variant}
        onClick={() => handleEmojiClick(emoji, reaction?.isReacted ?? false)}
      />
    );
  });

  const utilityButtons = (
    <>
      <ActionButton
        isSelected={bookmarked}
        onClick={handleBookmarkClick}
        variant={variant}
        label={bookmarkLabel}
      >
        {bookmarked ? (
          <BookmarkSolid className={variant === 'rail' ? 'size-5' : 'size-7'} />
        ) : (
          <Bookmark className={variant === 'rail' ? 'size-5' : 'size-7'} />
        )}
        {variant === 'inline' && (
          <span className="text-base">{bookmarkLabel}</span>
        )}
      </ActionButton>

      <LogClick eventName={LogEvents.detailClickShare} properties={{ id }}>
        <ShareButton title={title} variant={variant} />
      </LogClick>

      <LogClick eventName={LogEvents.detailClickCopyLink} properties={{ id }}>
        <CopyLinkButton title={title} variant={variant} />
      </LogClick>
    </>
  );

  if (variant === 'rail') {
    return (
      <div className={className}>
        <div className="border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark flex flex-col items-center gap-1 rounded-2xl border bg-white p-1.5 shadow-sm">
          {reactionButtons}
          <div
            aria-hidden
            className="bg-greyBorder dark:bg-dark_greyBorder my-1 h-px w-8"
          />
          {utilityButtons}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap gap-2">{reactionButtons}</div>
      <div className="flex flex-wrap gap-2">{utilityButtons}</div>
    </div>
  );
}

const ShareButton = ({
  title,
  variant = 'inline',
}: {
  title: string;
  variant?: ButtonVariant;
}) => {
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
    <ActionButton
      isSelected={false}
      onClick={handleShare}
      variant={variant}
      label={t('detail.share.action')}
    >
      <ShareIos className={variant === 'rail' ? 'size-5' : 'size-7'} />
      {variant === 'inline' && (
        <span className="text-base">{t('detail.share.action')}</span>
      )}
    </ActionButton>
  );
};

const CopyLinkButton = ({
  title,
  variant = 'inline',
}: {
  title: string;
  variant?: ButtonVariant;
}) => {
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
    <ActionButton
      isSelected={false}
      onClick={handleCopy}
      variant={variant}
      label={t('detail.copy_link.action')}
    >
      <Copy className={variant === 'rail' ? 'size-5' : 'size-7'} />
      {variant === 'inline' && (
        <span className="text-base">{t('detail.copy_link.action')}</span>
      )}
    </ActionButton>
  );
};
