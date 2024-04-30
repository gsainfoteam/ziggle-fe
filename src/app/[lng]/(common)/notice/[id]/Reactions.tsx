'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import {
  addReaction,
  deleteReaction,
  Notice,
  Reaction,
} from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import Fire from '@/assets/fire-outlined.svg';
import LinkIcon from '@/assets/icons/link.svg';
import ShareIcon from '@/assets/icons/share.svg';

import AnguishedFace from './assets/anguished-face.svg';
import LoudlyCryingFace from './assets/loudly-crying-face.svg';
import SurprisedFace from './assets/surprised-face-with-open-mouth.svg';
import ThinkingFace from './assets/thinking-face.svg';

const EMOJI_WIDTH = 30;

const emojis = {
  '🔥': <Fire width={EMOJI_WIDTH} />,
  '😭': <LoudlyCryingFace width={EMOJI_WIDTH} />,
  '😧': <AnguishedFace width={EMOJI_WIDTH} />,
  '🤔': <ThinkingFace width={EMOJI_WIDTH} />,
  '😮': <SurprisedFace width={EMOJI_WIDTH} />,
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
        `${isSelected ? 'bg-text' : 'bg-greyLight'}` +
        ' ' +
        `${isSelected ? 'text-white' : 'text-text'}`
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
  return (
    <>
      <ActionButton isSelected={isReacted} onClick={onClick}>
        <span>{emojis[emoji as keyof typeof emojis] ?? <p>{emoji}</p>}</span>

        <span className="text-base">{count}</span>
      </ActionButton>
    </>
  );
};

interface ReactionsProps {
  notice: Notice;
  lng: Locale;
}

const Reactions = ({
  notice: { title, id, reactions },
  lng,
}: ReactionsProps) => {
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
    const reactions = await toggleReaction(emoji, isReacted);

    if (reactions) {
      setCurrentReactions(reactions);
    }
  };

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

      <ActionButton isSelected={false} onClick={handleShare}>
        <span className="stroke-text">
          <LinkIcon width={26} />
        </span>

        <span className="text-base">링크 복사하기</span>
      </ActionButton>

      <ActionButton isSelected={false} onClick={handleShare}>
        <span className="stroke-text stroke-[1.5]">
          <ShareIcon width={26} />
        </span>

        <span className="text-base">공유하기</span>
      </ActionButton>
    </div>
  );
};

export default Reactions;
