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
      className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4"
      onClick={onShow}
    >
      <div>{t('zabo.clickPoster')}</div>
      <ArrowLeftIcon className="w-4 -rotate-90" />
    </Button>
  );
};

export default ShowcaseButton;
