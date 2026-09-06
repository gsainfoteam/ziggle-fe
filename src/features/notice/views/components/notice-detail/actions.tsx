import { createContext, useContext, useState, type ReactNode } from 'react';

import { BookmarkSimpleIcon, ShareFatIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import AnguishedFace from '@/assets/icons/anguished-face.svg?react';
import LoudlyCryingFace from '@/assets/icons/loudly-crying-face.svg?react';
import SurprisedFace from '@/assets/icons/surprised-face-with-open-mouth.svg?react';
import ThinkingFace from '@/assets/icons/thinking-face.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn, shareOrCopy } from '@/common/utils';
import { EmojiString, type Reaction } from '@/features/notice/models';
import {
  useAddReaction,
  useDeleteReaction,
  useToggleBookmark,
} from '@/features/notice/viewmodels';

import { FlameReactionIcon } from '../flame-reaction-icon';

const EMOJI_WIDTH_INLINE = 22;
const EMOJI_WIDTH_RAIL = 24;

const faceEmojis: Partial<
  Record<EmojiString, React.FC<React.SVGProps<SVGSVGElement>>>
> = {
  [EmojiString.CRYING]: LoudlyCryingFace,
  [EmojiString.ANGUISHED]: AnguishedFace,
  [EmojiString.THINKING]: ThinkingFace,
  [EmojiString.SURPRISED]: SurprisedFace,
};

const reactionEmojis: EmojiString[] = [
  EmojiString.FIRE,
  EmojiString.CRYING,
  EmojiString.ANGUISHED,
  EmojiString.THINKING,
  EmojiString.SURPRISED,
];

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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    aria-pressed={isSelected}
    className={cn(
      'cursor-pointer border-none transition outline-none',
      variant === 'rail'
        ? cn(
            'flex size-10 flex-col items-center justify-center gap-0.5 rounded-xl',
            isSelected
              ? 'bg-muted text-foreground'
              : 'text-foreground hover:bg-muted',
          )
        : cn(
            'flex h-8 items-center gap-1 rounded-full border px-2.5 py-1',
            isSelected
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'bg-muted text-foreground border-transparent',
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
  const EmojiComponent = faceEmojis[emoji as EmojiString];
  const isFire = emoji === EmojiString.FIRE;

  if (isFire) {
    return <FlameReactionIcon active={isReacted} size={size} />;
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
            : 'text-sm',
          isReacted && variant === 'inline' && 'text-primary font-medium',
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
  const { t } = useTranslation('notice');
  const {
    id,
    title,
    currentReactions,
    bookmarked,
    handleEmojiClick,
    handleBookmarkClick,
  } = useNoticeDetailActionsContext();

  const bookmarkLabel = t('detail.bookmark');

  const reactionButtons = reactionEmojis.map((emoji) => {
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
          <BookmarkSimpleIcon
            weight="fill"
            className={cn('text-primary size-5')}
          />
        ) : (
          <BookmarkSimpleIcon className="size-5" />
        )}
        {variant === 'inline' && (
          <span
            className={cn('text-sm', bookmarked && 'text-primary font-medium')}
          >
            {bookmarkLabel}
          </span>
        )}
      </ActionButton>

      <LogClick eventName={LogEvents.detailClickShare} properties={{ id }}>
        <ShareButton title={title} variant={variant} />
      </LogClick>
    </>
  );

  if (variant === 'rail') {
    return (
      <div className={className}>
        <div className="border-border bg-background flex flex-col items-center gap-1 rounded-2xl border p-1.5">
          {reactionButtons}
          <div aria-hidden className="bg-border my-1 h-px w-8" />
          {utilityButtons}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-nowrap gap-1.5 overflow-x-auto">
        {reactionButtons}
      </div>
      <div className="flex flex-wrap gap-1.5">{utilityButtons}</div>
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
  const handleShare = async () => {
    const url = window.location.href;
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
    <ActionButton
      isSelected={false}
      onClick={handleShare}
      variant={variant}
      label={t('detail.share.action')}
    >
      <ShareFatIcon className="size-5" />
      {variant === 'inline' && (
        <span className="text-sm">{t('detail.share.action')}</span>
      )}
    </ActionButton>
  );
};
