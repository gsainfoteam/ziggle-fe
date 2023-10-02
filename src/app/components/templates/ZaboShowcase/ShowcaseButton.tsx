'use client';

import { useTranslation } from '@/app/i18next/client';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

import Button from '../../atoms/Button';

interface ShowcaseButtonProps {
  onShow: () => void;
}

const ShowcaseButton = ({ onShow }: ShowcaseButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      className="absolute bottom-4 flex gap-4 items-center left-1/2 -translate-x-1/2"
      onClick={onShow}
    >
      <div>{t('zabo.clickPoster')}</div>
      <ArrowLeftIcon className="-rotate-90 w-4" />
    </Button>
  );
};

export default ShowcaseButton;
