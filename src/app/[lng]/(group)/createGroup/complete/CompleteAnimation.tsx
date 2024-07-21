'use client';

import Lottie from 'lottie-react';

import completeAnimation from '@/assets/animations/complete.json';

const CompleteAnimation = () => {
  return (
    <>
      <Lottie
        animationData={completeAnimation}
        loop={false}
        className="w-[140px]"
      />
    </>
  );
};

export default CompleteAnimation;
