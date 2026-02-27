import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import FireActivated from '@/assets/icons/fire-activated.svg?react';
import Fire from '@/assets/icons/fire.svg?react';
import ShareIcon from '@/assets/icons/share.svg?react';
import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import {
  EmojiString,
  type Notice,
  type Reaction,
} from '@/features/notice/models';
import {
  useAddReaction,
  useDeleteReaction,
} from '@/features/notice/viewmodels';

interface FireButtonProps {
  id: number;
  fire: Reaction;
}

const FireButton = ({ id, fire }: FireButtonProps) => {
  const { t } = useTranslation('notice');
  const { mutateAsync: addReaction } = useAddReaction();
  const { mutateAsync: deleteReaction } = useDeleteReaction();

  const [currentFire, setCurrentFire] = useState<Reaction>(fire);

  const toggleReaction = async (emoji: string, isReacted: boolean) => {
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
  };

  const handleEmojiClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    emoji: string,
    isReacted: boolean,
  ) => {
    e.preventDefault();

    try {
      const reactions = await toggleReaction(emoji, isReacted);
      const fireReaction = reactions.find(({ emoji }) => emoji === '🔥');

      setCurrentFire(
        fireReaction ?? { count: 0, emoji: '🔥', isReacted: false },
      );
    } catch {
      toast.error(t('searchPage.loginRequired'));
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        animated
        className="group flex items-center gap-1"
        onClick={(e) =>
          handleEmojiClick(e, currentFire.emoji, currentFire.isReacted)
        }
      >
        {currentFire.isReacted ? (
          <FireActivated width={36} className="duration-150 hover:scale-125" />
        ) : (
          <Fire
            width={36}
            className="stroke-text dark:stroke-dark_white duration-150 hover:scale-125"
          />
        )}
      </Button>
      <p className="dark:text-dark_white font-semibold">{currentFire.count}</p>
    </div>
  );
};

interface ShareButtonProps {
  title: string;
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const { t } = useTranslation('notice');
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <Button
      animated
      className="group flex items-center gap-1"
      onClick={handleShare}
    >
      <ShareIcon
        width={26}
        className="stroke-text dark:stroke-dark_white stroke-2 duration-150 hover:scale-125"
      />
    </Button>
  );
};

export const ZaboActions = ({ id, title, reactions }: Notice) => {
  const fire = reactions.find(({ emoji }) => emoji === EmojiString.FIRE) ?? {
    emoji: EmojiString.FIRE,
    count: 0,
    isReacted: false,
  };

  return (
    <div className="flex items-center justify-between">
      <LogClick
        eventName={LogEvents.noticeClickReaction}
        properties={{ id, emoji: fire.emoji }}
      >
        <FireButton id={id} fire={fire} />
      </LogClick>
      <LogClick
        eventName={LogEvents.noticeClickShare}
        properties={{
          id,
        }}
      >
        <ShareButton title={title} />
      </LogClick>
    </div>
  );
};
