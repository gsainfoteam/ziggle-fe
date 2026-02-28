import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';

import CatBounceAnimation from '@/assets/animations/cat-bounce.json';

export const LoadingCatAnimation = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={CatBounceAnimation} loop className="w-40" />
      <div className="text-secondaryText text-2xl font-medium">
        {t('loading')}
      </div>
    </div>
  );
};
