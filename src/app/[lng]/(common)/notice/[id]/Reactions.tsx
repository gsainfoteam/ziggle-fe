'use client';

import { toast } from 'react-toastify';

import { ADD_REACTION, Notice, Reaction } from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';

import { apolloClient } from '../../InitClient';
import AnguishedFace from './assets/anguished-face.svg';
import Fire from './assets/fire-outlined.svg';
import LoudlyCryingFace from './assets/loudly-crying-face.svg';
import SurprisedFace from './assets/surprised-face-with-open-mouth.svg';
import ThinkingFace from './assets/thinking-face.svg';

const ReactionButton = ({
  emoji,
  count,
  isReacted,
  onClick,
}: Reaction & { onClick: () => void }) => {
  return (
    <Button variant={isReacted ? 'contained' : 'outlined'} onClick={onClick}>
      {emoji === '🔥' ? (
        <Fire width={20} />
      ) : emoji === '😭' ? (
        <LoudlyCryingFace width={20} />
      ) : emoji === '😧' ? (
        <AnguishedFace width={20} />
      ) : emoji === '🤔' ? (
        <ThinkingFace width={20} />
      ) : emoji === '😮' ? (
        <SurprisedFace width={20} />
      ) : null}

      <p>{count}</p>
    </Button>
  );
};

interface ReactionsProps {
  notice: Notice;
}

const preReactionList = ['🔥', '😭', '😧', '🤔', '😮'];

const Reactions = ({ notice: { id, reactions } }: ReactionsProps) => {
  const handleEmojiClick = async (emoji: string) => {
    try {
      const res = await apolloClient.mutate({
        mutation: ADD_REACTION,
        variables: {
          noticeId: id,
          emoji,
        },
      });
    } catch (e) {
      toast.error('로그인이 필요합니다.');
      console.log(e);
    }
  };

  return (
    <div className={'flex gap-2'}>
      {preReactionList
        .map((emoji) => {
          const reaction = reactions.find(
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
            onClick={() => handleEmojiClick(reaction.emoji)}
            {...reaction}
          />
        ))}
    </div>
  );
};

export default Reactions;
