'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { useTranslation } from '@/app/i18next/client';

import HorizontalScrollButton from '../../molecules/HorizontalScrollButton';

const SCROLL_AMOUNT = 800;

interface ImageCarouselProps {
  srcs: string[];
  alt: string;
}

const ImageCarousel = ({ srcs, alt }: ImageCarouselProps) => {
  const { t } = useTranslation();
  const carouselEl = useRef<HTMLDivElement>(null);
  const [carouselLeft, setCarouselLeft] = useState(0);
  const leftDisabled = carouselLeft === 0;
  const rightDisabled = carouselEl.current
    ? carouselLeft + 10 >
      carouselEl.current.scrollWidth - carouselEl.current.clientWidth
    : true;

  const scroll = (amount: number) => {
    if (!carouselEl.current) return;
    carouselEl.current.scrollBy({ left: amount, behavior: 'smooth' });
  };
  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setCarouselLeft(e.currentTarget.scrollLeft);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="text-2xl md:text-4xl font-bold">{t('zabo.images')}</div>
        <HorizontalScrollButton>
          <HorizontalScrollButton.Left
            disabled={leftDisabled}
            onClick={() => scroll(-SCROLL_AMOUNT)}
          />
          <HorizontalScrollButton.Right
            disabled={rightDisabled}
            onClick={() => scroll(SCROLL_AMOUNT)}
          />
        </HorizontalScrollButton>
      </div>
      <div
        className="w-full flex gap-5 bg-deselected dark:bg-text border-y-2 border-text dark:border-secondayText p-3 overflow-x-scroll scrollbar-none"
        ref={carouselEl}
        onScroll={handleCarouselScroll}
      >
        {srcs.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            width={300}
            height={300}
            className="border-2 border-white rounded basis-48 md:basis-80 shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
