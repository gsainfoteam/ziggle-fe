'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import {
  addReaction,
  deleteReaction,
  EmojiString,
  Notice,
  Reaction,
} from '@/api/notice/notice';
import Analytics from '@/app/components/shared/Analytics';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import AnguishedFace from '@/assets/icons/anguished-face.svg';
import Fire from '@/assets/icons/fire-outlined.svg';
import LinkIcon from '@/assets/icons/link.svg';
import LoudlyCryingFace from '@/assets/icons/loudly-crying-face.svg';
import ShareIcon from '@/assets/icons/share.svg';
import SurprisedFace from '@/assets/icons/surprised-face-with-open-mouth.svg';
import ThinkingFace from '@/assets/icons/thinking-face.svg';

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
            ? 'text-white dark:text-dark_dark'
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
                      ? 'stroke-white dark:stroke-dark_dark'
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
  notice: Notice;
  lng: Locale;
}

const Actions = ({ notice: { title, id, reactions }, lng }: ReactionsProps) => {
  const router = useRouter();
  const [currentReactions, setCurrentReactions] =
    useState<Reaction[]>(reactions);

  const toggleReaction = async (emoji: string, isReacted: boolean) => {
    try {
      if (isReacted) {
        const res = await deleteReaction(id, emoji);

        return res.reactions;
      } else {
        const res = await addReaction(id, emoji);

        return res.reactions;
      }
    } catch (e) {
      toast.error('로그인이 필요합니다.');
    }
  };

  const handleEmojiClick = async (emoji: string, isReacted: boolean) => {
    sendLog(LogEvents.detailClickEmoji, { emoji, isReacted });
    const reactions = await toggleReaction(emoji, isReacted);

    if (reactions) {
      setCurrentReactions(reactions);
      router.refresh();
    }
  };

  return (
    <div className={'flex w-full flex-wrap gap-x-2 gap-y-[10px] py-[10px]'}>
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

      <Analytics event={LogEvents.detailClickShare}>
        <ShareButton title={title} lng={lng} />
      </Analytics>

      <Analytics event={LogEvents.detailClickCopyLink}>
        <CopyLinkButton title={title} lng={lng} />
      </Analytics>
    </div>
  );
};

interface ActionsProps {
  title: string;
  lng: Locale;
}

const ShareButton = ({ title, lng }: ActionsProps) => {
  const { t } = useTranslation(lng);
  const handleShare = () => {
    if (!navigator.canShare) {
      return Swal.fire({ title: t('zabo.share.unsupported'), icon: 'error' });
    }
    navigator.share({
      title,
      text: t('zabo.share.content', { title }),
      url: window.location.href,
    });
  };

  return (
    <ActionButton isSelected={false} onClick={handleShare}>
      <span className="stroke-text stroke-[1.5] dark:stroke-dark_white">
        <ShareIcon width={26} />
      </span>

      <span className="text-base">{t('zabo.share.action')}</span>
    </ActionButton>
  );
};

const CopyLinkButton = ({ title, lng }: ActionsProps) => {
  const { t } = useTranslation(lng);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      t('zabo.copyLink.content', { title, link: window.location.href }),
    );

    toast.success(
      <div className="flex flex-col text-sm font-medium">
        <Trans t={t} i18nKey="zabo.copyLink.success">
          successed <div className="text-xs">share to friends</div>
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

export default Actions;
