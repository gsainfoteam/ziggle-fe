"use client";

import Lottie from "lottie-react";

import { T } from "@/app/i18next";
import CatBounceAnimation from "@/assets/animations/cat-bounce.json";

const LoadingCatAnimation = ({ t }: { t: T }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-12" />
      <Lottie animationData={CatBounceAnimation} loop className="w-40" />
      <div className="text-secondayText font-medium text-2xl">
        {t("loading")}
      </div>
    </div>
  );
};

export default LoadingCatAnimation;
