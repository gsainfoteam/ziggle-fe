import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import NavArrowRight from '@/assets/icons/nav-arrow-right.svg?react';

interface Slide {
  image: React.ComponentType<{ className?: string }>;
  url: string;
}

interface BannerCarouselProps {
  slides: Slide[];
}

export function BannerCarousel({ slides }: BannerCarouselProps) {
  const { t } = useTranslation('common');
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  const next = () => {
    setIndex((i) => (i + 1) % slides.length);
    resetTimer();
  };
  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current !== null)
        window.clearInterval(intervalRef.current);
    };
  }, [resetTimer, slides.length]);

  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-200 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const Banner = slide.image;
            return (
              <a
                key={i}
                href={slide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full shrink-0"
                aria-hidden={i !== index}
                tabIndex={i !== index ? -1 : undefined}
              >
                <Banner className="block h-auto w-full rounded-[20px]" />
              </a>
            );
          })}
        </div>

        <button
          onClick={prev}
          aria-label={t('carousel.prev')}
          className="bg-dark_white/50 hover:bg-dark_white/80 absolute top-1/2 left-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-2xl p-1.25"
        >
          <NavArrowRight className="h-5 w-5 rotate-180" />
        </button>
        <button
          onClick={next}
          aria-label={t('carousel.next')}
          className="bg-dark_white/50 hover:bg-dark_white/80 absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-2xl p-1.25"
        >
          <NavArrowRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={t('carousel.slide', { number: i + 1 })}
              className={`h-1.5 w-6 rounded-[20px] transition-colors ${
                i === index ? 'bg-dark_white' : 'bg-deselected'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
