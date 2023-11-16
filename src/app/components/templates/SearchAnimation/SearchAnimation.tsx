'use client';

import Lottie from 'lottie-react';

import animationData from '@/assets/animations/search.json';

const SearchAnimation = () => {
  return <Lottie loop={false} animationData={animationData} className="w-64" />;
};

export default SearchAnimation;
