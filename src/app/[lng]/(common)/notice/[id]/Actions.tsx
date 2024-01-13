'use client';

import Link from 'next/link';
import { Trans } from 'react-i18next';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Button from '@/app/components/atoms/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import LinkIcon from '@/assets/icons/link.svg';
import ShareIcon from '@/assets/icons/share.svg';

interface ActionsProps {
  title: string;
  lng: Locale;
}

const Actions = ({ title, lng }: ActionsProps) => (
  <div className="flex justify-between">
    <div className="flex gap-2">
      <CopyLinkButton title={title} lng={lng} />
      <ShareButton title={title} lng={lng} />
    </div>
    <BackToMainButton lng={lng} />
  </div>
);

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
    <Button
      animated
      className="group flex items-center gap-1"
      onClick={handleCopy}
    >
      <LinkIcon className="w-5 fill-secondaryText group-hover:fill-primary md:w-7" />
      <div className="text-xs font-medium text-secondaryText group-hover:text-primary md:text-base">
        {t('zabo.copyLink.action')}
      </div>
    </Button>
  );
};

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
    <Button
      animated
      className="group flex items-center gap-1"
      onClick={handleShare}
    >
      <ShareIcon className="w-4 fill-secondaryText group-hover:fill-primary md:w-6" />
      <div className="text-xs font-medium text-secondaryText group-hover:text-primary md:text-base">
        {t('zabo.share.action')}
      </div>
    </Button>
  );
};

const BackToMainButton = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);
  return (
    <Link href={`/${lng}`}>
      <div className="group flex items-center gap-1 transition-[gap] hover:gap-4 md:gap-2">
        <ArrowLeftIcon className="w-4 rotate-180 fill-secondaryText transition-colors group-hover:fill-primary md:w-6" />
        <div className="text-sm font-medium text-secondaryText transition-colors group-hover:text-primary md:text-lg">
          {t('zabo.backToMain')}
        </div>
        <div className="h-5 w-1 bg-secondaryText transition-colors group-hover:bg-primary md:h-8" />
      </div>
    </Link>
  );
};

export default Actions;
