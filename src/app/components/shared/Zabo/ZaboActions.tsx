'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import LogEvents from '@/api/log/log-events';
import {
  addReaction,
  deleteReaction,
  EmojiString,
  Notice,
  Reaction,
} from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import Fire from '@/assets/icons/fire.svg';
import FireActivated from '@/assets/icons/fire-activated.svg';
import ShareIcon from '@/assets/icons/share.svg';

import Analytics from '../Analytics';
import Button from '../Button';

type ZaboActionsProps = PropsWithLng<Notice>;

interface FireButtonProps {
  id: number;
  fire: Reaction;
  lng: Locale;
}

const FireButton = ({ id, fire, lng }: FireButtonProps) => {
  const { t } = useTranslation(lng);

  const [currentFire, setCurrentFire] = useState<Reaction>(fire);

  const toggleReaction = async (emoji: string, isReacted: boolean) => {
    if (isReacted) {
      const res = await deleteReaction(id, emoji);
      return res.reactions;
    } else {
      const res = await addReaction(id, emoji);
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
    } catch (e) {
      toast.error(t('searchPage.loginRequired'));
    }
  };

  return (
    <div className={'flex items-center gap-1'}>
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
            className="stroke-text duration-150 hover:scale-125 dark:stroke-dark_white"
          />
        )}
      </Button>
      <p className={'font-semibold dark:text-dark_white'}>
        {currentFire.count}
      </p>
    </div>
  );
};

interface ShareButtonProps {
  title: string;
  lng: Locale;
}

const ShareButton = ({ title, lng }: ShareButtonProps) => {
  const { t } = useTranslation(lng);
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <Button
      animated
      className="group flex items-center gap-1"
      onClick={handleShare}
    >
      <ShareIcon
        width={26}
        className="stroke-text stroke-2 duration-150 hover:scale-125 dark:stroke-dark_white"
      />
    </Button>
  );
};

const ZaboActions = ({ id, title, reactions, lng }: ZaboActionsProps) => {
  const fire = reactions.find(({ emoji }) => emoji === EmojiString.FIRE) ?? {
    emoji: EmojiString.FIRE,
    count: 0,
    isReacted: false,
  };

  return (
    <div className={'flex items-center justify-between'}>
      <Analytics
        event={LogEvents.noticeClickReaction}
        properties={{ id, emoji: fire.emoji }}
      >
        <FireButton id={id} fire={fire} lng={lng} />
      </Analytics>
      <Analytics
        event={LogEvents.noticeClickShare}
        properties={{
          id,
        }}
      >
        <ShareButton title={title} lng={lng} />
      </Analytics>
    </div>
  );
};

export default ZaboActions;
