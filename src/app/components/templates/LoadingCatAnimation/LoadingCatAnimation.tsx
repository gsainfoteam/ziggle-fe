'use client';

import Lottie from 'lottie-react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import LoadingAnimation from '@/assets/animations/loading.json';

const LoadingCatAnimation = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={LoadingAnimation} loop className="w-20" />
      <div className="h-4" />
      <div className="text-lg font-medium text-secondaryText">
        {t('loading')}
      </div>
    </div>
  );
};

export default LoadingCatAnimation;
