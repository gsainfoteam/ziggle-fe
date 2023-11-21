'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';

import HorizontalScrollButton from '../../molecules/HorizontalScrollButton';

const SCROLL_AMOUNT = 800;

interface ImageCarouselProps {
  srcs: string[];
  alt: string;
  lng: Locale;
}

const ImageCarousel = ({ srcs, alt, lng }: ImageCarouselProps) => {
  const { t } = useTranslation(lng);
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
    <div className="flex w-full flex-col gap-8">
      <div className="flex justify-between">
        <div className="text-2xl font-bold md:text-4xl">{t('zabo.images')}</div>
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
        className="flex w-full gap-5 overflow-x-scroll border-y-2 border-text bg-deselected p-3 scrollbar-none dark:border-secondaryText dark:bg-text"
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
            className="shrink-0 basis-48 rounded border-2 border-white md:basis-80"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
