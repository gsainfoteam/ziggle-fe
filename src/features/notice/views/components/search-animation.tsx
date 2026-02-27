import Lottie from 'lottie-react';

import animationData from '@/assets/animations/search.json';

export const SearchAnimation = () => {
  return <Lottie loop={false} animationData={animationData} className="w-64" />;
};
