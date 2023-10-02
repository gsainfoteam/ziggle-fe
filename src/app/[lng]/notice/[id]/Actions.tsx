'use client';

import Link from 'next/link';
import { Trans } from 'react-i18next';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Button from '@/app/components/atoms/Button';
import { useTranslation } from '@/app/i18next/client';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import LinkIcon from '@/assets/icons/link.svg';
import ShareIcon from '@/assets/icons/share.svg';

interface ActionsProps {
  title: string;
}

const Actions = ({ title }: ActionsProps) => (
  <div className="flex justify-between">
    <div className="flex gap-2">
      <CopyLinkButton title={title} />
      <ShareButton title={title} />
    </div>
    <BackToMainButton />
  </div>
);

const CopyLinkButton = ({ title }: ActionsProps) => {
  const { t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(
      t('zabo.copyLink.content', { title, link: window.location.href }),
    );

    toast.success(
      <div className="font-medium text-sm flex flex-col">
        <Trans i18nKey="zabo.copyLink.success">
          successed <div className="text-xs">share to friends</div>
        </Trans>
      </div>,
    );
  };

  return (
    <Button
      animated
      className="group items-center gap-1 flex"
      onClick={handleCopy}
    >
      <LinkIcon className="w-5 md:w-7 fill-secondayText group-hover:fill-primary" />
      <div className="font-medium text-secondayText group-hover:text-primary text-xs md:text-base">
        {t('zabo.copyLink.action')}
      </div>
    </Button>
  );
};

const ShareButton = ({ title }: ActionsProps) => {
  const { t } = useTranslation();
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
    <Button
      animated
      className="group items-center gap-1 flex"
      onClick={handleShare}
    >
      <ShareIcon className="w-4 md:w-6 fill-secondayText group-hover:fill-primary" />
      <div className="font-medium text-secondayText group-hover:text-primary text-xs md:text-base">
        {t('zabo.share.action')}
      </div>
    </Button>
  );
};

const BackToMainButton = () => {
  const { t, i18n } = useTranslation();
  return (
    <Link href={`/${i18n.language}`}>
      <div className="flex items-center transition-[gap] gap-1 md:gap-2 group hover:gap-4">
        <ArrowLeftIcon className="transition-colors fill-secondayText group-hover:fill-primary w-4 md:w-6 rotate-180" />
        <div className="transition-colors font-medium text-sm md:text-lg text-secondayText group-hover:text-primary">
          {t('zabo.backToMain')}
        </div>
        <div className="transition-colors h-5 md:h-8 w-1 bg-secondayText group-hover:bg-primary" />
      </div>
    </Link>
  );
};

export default Actions;
