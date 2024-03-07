'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  addReaction,
  deleteReaction,
  Notice,
  Reaction,
} from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';

import AnguishedFace from './assets/anguished-face.svg';
import Fire from './assets/fire-outlined.svg';
import LoudlyCryingFace from './assets/loudly-crying-face.svg';
import SurprisedFace from './assets/surprised-face-with-open-mouth.svg';
import ThinkingFace from './assets/thinking-face.svg';

const emojis = {
  '🔥': <Fire width={20} fill={'#eb6263'} />,
  '😭': <LoudlyCryingFace width={20} />,
  '😧': <AnguishedFace width={20} />,
  '🤔': <ThinkingFace width={20} />,
  '😮': <SurprisedFace width={20} />,
};

const ReactionButton = ({
  emoji,
  count,
  isReacted,
  onClick,
}: Reaction & { onClick: () => void }) => {
  return (
    <Button variant={isReacted ? 'contained' : 'outlined'} onClick={onClick}>
      {emojis[emoji as keyof typeof emojis] ?? <p>{emoji}</p>}

      <p>{count}</p>
    </Button>
  );
};

interface ReactionsProps {
  notice: Notice;
}

const Reactions = ({ notice: { id, reactions } }: ReactionsProps) => {
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

  return (
    <div className={'flex gap-2'}>
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
    </div>
  );
};

export default Reactions;
