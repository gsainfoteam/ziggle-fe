'use client';

import { FetchResult } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  ADD_REACTION,
  DELETE_REACTION,
  Notice,
  Reaction,
} from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';
import {
  AddReactionMutation,
  DeleteReactionMutation,
} from '@/generated/graphql';

import { apolloClient } from '../../InitClient';
import AnguishedFace from './assets/anguished-face.svg';
import Fire from './assets/fire-outlined.svg';
import LoudlyCryingFace from './assets/loudly-crying-face.svg';
import SurprisedFace from './assets/surprised-face-with-open-mouth.svg';
import ThinkingFace from './assets/thinking-face.svg';

const preReactionList = ['🔥', '😭', '😧', '🤔', '😮'];

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
        const res = await apolloClient.mutate({
          mutation: DELETE_REACTION,
          variables: {
            noticeId: id,
            emoji,
          },
        });

        return res.data?.deleteReaction.reactions;
      } else {
        const res = await apolloClient.mutate({
          mutation: ADD_REACTION,
          variables: {
            noticeId: id,
            emoji,
          },
        });

        return res.data?.addReaction.reactions;
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
