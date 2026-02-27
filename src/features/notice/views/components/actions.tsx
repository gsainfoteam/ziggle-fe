import { useState } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import AnguishedFace from '@/assets/icons/anguished-face.svg?react';
import Fire from '@/assets/icons/fire-outlined.svg?react';
import LinkIcon from '@/assets/icons/link.svg?react';
import LoudlyCryingFace from '@/assets/icons/loudly-crying-face.svg?react';
import ShareIcon from '@/assets/icons/share.svg?react';
import SurprisedFace from '@/assets/icons/surprised-face-with-open-mouth.svg?react';
import ThinkingFace from '@/assets/icons/thinking-face.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import { EmojiString, type NoticeDetail, type Reaction } from '../../models';
import { useAddReaction, useDeleteReaction } from '../../viewmodels';

const EMOJI_WIDTH = 30;

const emojis: {
  [key in EmojiString]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
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

const ActionButton = ({ isSelected, onClick, children }: ActionButtonProps) => {
  return (
    <button
      className={
        'flex h-10 items-center gap-[7px] rounded-full border-none px-[13px] py-[5px] outline-none' +
        ' ' +
        `${
          isSelected
            ? 'bg-text dark:bg-dark_white'
            : 'bg-greyLight dark:bg-dark_greyDark'
        }` +
        ' ' +
        `${
          isSelected
            ? 'dark:text-dark_dark text-white'
            : 'text-text dark:text-dark_white'
        }`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ReactionButton = ({
  emoji,
  count,
  isReacted,
  onClick,
}: Reaction & { onClick: () => void }) => {
  const EmojiComponent = emojis[emoji as keyof typeof emojis];

  return (
    <>
      <ActionButton isSelected={isReacted} onClick={onClick}>
        <span>
          {EmojiComponent ? (
            emoji === EmojiString.FIRE ? (
              <span
                className={
                  'stroke-2 ' +
                  `${
                    isReacted
                      ? 'dark:stroke-dark_dark stroke-white'
                      : 'stroke-text dark:stroke-dark_white'
                  }`
                }
              >
                <EmojiComponent width={EMOJI_WIDTH} />
              </span>
            ) : (
              <EmojiComponent width={EMOJI_WIDTH} />
            )
          ) : (
            <p>{emoji}</p>
          )}
        </span>
        <span className="text-base">{count}</span>
      </ActionButton>
    </>
  );
};

interface ReactionsProps {
  notice: NoticeDetail;
}

export const Actions = ({
  notice: { title, id, reactions },
}: ReactionsProps) => {
  const [currentReactions, setCurrentReactions] =
    useState<Reaction[]>(reactions);
  const { mutateAsync: deleteReaction } = useDeleteReaction();
  const { mutateAsync: addReaction } = useAddReaction();

  const toggleReaction = async (emoji: string, isReacted: boolean) => {
    try {
      if (isReacted) {
        const res = await deleteReaction({
          params: { path: { id } },
          body: { emoji },
        });

        return res.reactions;
      } else {
        const res = await addReaction({
          params: { path: { id } },
          body: { emoji },
        });

        return res.reactions;
      }
    } catch {
      toast.error('로그인이 필요합니다.');
    }
  };

  const handleEmojiClick = async (emoji: string, isReacted: boolean) => {
    // TODO: send log
    // sendLog(LogEvents.detailClickReaction, { id, type: emoji, isReacted });
    const reactions = await toggleReaction(emoji, isReacted);

    if (reactions) {
      setCurrentReactions(reactions);
    }
  };

  return (
    <div className="flex w-full flex-wrap gap-x-2 gap-y-[10px] py-[10px]">
      {Object.keys(emojis)
        .map((emoji) => {
          const reaction = currentReactions.find(
            (reaction) => reaction.emoji === emoji,
          );

          return {
            emoji,
            count: reaction?.count ?? 0,
            isReacted: reaction?.isReacted ?? false,
          };
        })
        .map((reaction) => (
          <ReactionButton
            key={reaction.emoji}
            onClick={() => handleEmojiClick(reaction.emoji, reaction.isReacted)}
            {...reaction}
            isReacted={reaction.isReacted}
          />
        ))}

      <LogClick
        eventName={LogEvents.detailClickShare}
        properties={{
          id,
        }}
      >
        <ShareButton title={title} />
      </LogClick>

      <LogClick
        eventName={LogEvents.detailClickCopyLink}
        properties={{
          id,
        }}
      >
        <CopyLinkButton title={title} />
      </LogClick>
    </div>
  );
};

interface ActionsProps {
  title: string;
}

const ShareButton = ({ title }: ActionsProps) => {
  const { t } = useTranslation('notice');
  const handleShare = () => {
    if (!navigator.canShare) {
      return toast.error(t('zabo.share.unsupported'));
    }
    navigator.share({
      title,
      text: t('zabo.share.content', { title }),
      url: window.location.href,
    });
  };

  return (
    <ActionButton isSelected={false} onClick={handleShare}>
      <span className="stroke-text dark:stroke-dark_white stroke-[1.5]">
        <ShareIcon width={26} />
      </span>

      <span className="text-base">{t('zabo.share.action')}</span>
    </ActionButton>
  );
};

const CopyLinkButton = ({ title }: ActionsProps) => {
  const { t } = useTranslation('notice');
  const handleCopy = () => {
    navigator.clipboard.writeText(
      t('zabo.copyLink.content', { title, link: window.location.href }),
    );

    toast.success(
      <div className="flex flex-col text-sm font-medium">
        <Trans t={t} i18nKey="zabo.copyLink.success">
          succeeded <div className="text-xs">share to friends</div>
        </Trans>
      </div>,
    );
  };

  return (
    <ActionButton isSelected={false} onClick={handleCopy}>
      <span className="stroke-text dark:stroke-dark_white">
        <LinkIcon width={26} />
      </span>

      <span className="text-base">{t('zabo.copyLink.action')}</span>
    </ActionButton>
  );
};
