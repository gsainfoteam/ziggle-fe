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
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import Fire from '@/assets/icons/fire.svg';
import FireActivated from '@/assets/icons/fire-activated.svg';
import ShareIcon from '@/assets/icons/share.svg';

import Button from '../../atoms/Button';

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
    try {
      if (isReacted) {
        const res = await deleteReaction(id, emoji);
        return res.reactions;
      } else {
        const res = await addReaction(id, emoji);
        return res.reactions;
      }
    } catch (e) {
      toast.error(t('searchPage.loginRequired'));
    }
  };

  const handleEmojiClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    emoji: string,
    isReacted: boolean,
  ) => {
    e.preventDefault();

    const reactions = await toggleReaction(emoji, isReacted);
    const fireReaction = reactions?.find(({ emoji }) => emoji === '🔥');

    if (fireReaction) {
      setCurrentFire(fireReaction);
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
          <FireActivated
            width={36}
            className={`h-7 w-7 duration-150 hover:scale-125 md:h-9 md:w-9`}
          />
        ) : (
          <Fire
            width={36}
            className={`h-7 w-7 duration-150 hover:scale-125 md:h-9 md:w-9`}
          />
        )}
      </Button>
      <p className={'font-semibold'}>{currentFire.count}</p>
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
        className="stroke-black stroke-2 duration-150 hover:scale-125"
      />
    </Button>
  );
};

const ZaboActions = ({ id, title, reactions, lng }: ZaboActionsProps) => {
  const fire = reactions.find(({ emoji }) => emoji === '🔥');

  return (
    <div className={'flex items-center justify-between'}>
      {fire && <FireButton id={id} fire={fire} lng={lng} />}
      <ShareButton title={title} lng={lng} />
    </div>
  );
};

export default ZaboActions;
