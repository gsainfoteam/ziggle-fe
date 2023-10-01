'use client';

import Image from 'next/image';

import { useTranslation } from '@/app/i18next/client';
import CatBounceAnimation from '@/assets/cat-bounce.gif';

const LoadingCatAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Image src={CatBounceAnimation} alt="loading" />
      <div className="text-secondayText font-medium text-2xl">
        {t('loading')}
      </div>
    </div>
  );
};

export default LoadingCatAnimation;
