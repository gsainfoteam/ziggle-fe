'use client';

import Lottie from 'lottie-react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import CatBounceAnimation from '@/assets/animations/cat-bounce.json';

const LoadingCatAnimation = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={CatBounceAnimation} loop className="w-40" />
      <div className="text-2xl font-medium text-secondaryText">
        {t('loading')}
      </div>
    </div>
  );
};

export default LoadingCatAnimation;
