"use client";

import React, { useEffect, useRef, useState } from 'react';
import NavArrowRight from '@/assets/icons/nav-arrow-right.svg';

interface Slide {
  image: React.ComponentType<{ className?: string }>;
  url: string;
}

interface BannerCarouselProps {
  slides: Slide[];
}

export default function BannerCarousel({ slides }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (intervalRef.current !== null)
      window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
  };

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
  }, [slides.length]);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[800px] overflow-hidden">
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
                className="block w-full flex-shrink-0"
                aria-hidden={i !== index}
                tabIndex={i !== index ? -1 : undefined}
              >
                <Banner className="w-full h-auto block rounded-[20px]" />
              </a>
            );
          })}
        </div>

        <button
          onClick={prev}
          aria-label="이전"
          className="absolute left-3 top-1/2 -translate-y-1/2 size-7 p-[5px] bg-[#ffffff80] rounded-2xl inline-flex justify-center items-center hover:bg-[#ffffffcc]"
        >
          <NavArrowRight className='w-5 h-5 rotate-180'/>
        </button>
        <button
          onClick={next}
          aria-label="다음"
          className="absolute right-3 top-1/2 -translate-y-1/2 size-7 p-[5px] bg-[#ffffff80] rounded-2xl inline-flex justify-center items-center hover:bg-[#ffffffcc]"
        >
          <NavArrowRight className='w-5 h-5'/>
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`슬라이드 ${i + 1} 보기`}
              className={`w-6 h-1.5 rounded-[20px] transition-colors ${
                i === index ? 'bg-white' : 'bg-[#D9D9D9]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}