'use client';

import Image from 'next/image';

import { ADD_REACTION } from '@/api/notice/notice';
import Button from '@/app/components/atoms/Button';

import { apolloClient } from '../../InitClient';
import AnguishedFace from './assets/anguished-face.svg';
import Fire from './assets/fire-outlined.svg';
import LoudlyCryingFace from './assets/loudly-crying-face.svg';
import SurprisedFace from './assets/surprised-face-with-open-mouth.svg';
import ThinkingFace from './assets/thinking-face.svg';

interface ReactionsProps {
  noticeId: number;
}

const Reactions = ({ noticeId }: ReactionsProps) => {
  const handleEmojiClick = async (emoji: string) => {
    const res = apolloClient.mutate({
      mutation: ADD_REACTION,
      variables: {
        noticeId,
        emoji,
      },
    });
  };

  return (
    <div className={'flex gap-2'}>
      <Button variant={'contained'} onClick={() => handleEmojiClick('🔥')}>
        <Fire />
      </Button>

      <Button variant={'contained'}>
        <LoudlyCryingFace width={20} />
      </Button>

      <Button variant={'contained'}>
        <AnguishedFace width={20} />
      </Button>

      <Button variant={'contained'}>
        <ThinkingFace width={20} />
      </Button>

      <Button variant={'contained'}>
        <SurprisedFace width={20} />
      </Button>
    </div>
  );
};

export default Reactions;
