'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ZaboImageCarouselProps {
  imageUrls: string[];
  title: string;
  imageSize?: number;
  gap?: number;
}

const ZaboImageCarousel = ({
  imageUrls,
  title,
  imageSize = 200,
  gap = 8,
}: ZaboImageCarouselProps) => {
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [indicesInView, setIndicesInView] = useState<{
    first: number;
    last: number;
  }>({
    first: 0,
    last: Math.floor(
      imagesContainerRef.current?.clientWidth ?? 800 / (imageSize + gap),
    ),
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIndicesInView({
      first: Math.floor((e.currentTarget.scrollLeft + gap) / (imageSize + gap)),
      last: Math.floor(
        e.currentTarget.scrollLeft / (imageSize + gap) +
          (e.currentTarget.clientWidth + gap) / (imageSize + gap),
      ),
    });
  };

  const isOverflowing =
    (imagesContainerRef.current?.scrollWidth ?? 0) >
    (imagesContainerRef.current?.clientWidth ?? 0);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div
        ref={imagesContainerRef}
        onScroll={handleScroll}
        style={{
          scrollSnapStop: 'normal',
          scrollSnapType: 'x mandatory',
          gap: gap,
          maxHeight: imageSize,
          overscrollBehaviorX: 'none',
        }}
        className="relative flex w-fit overflow-y-hidden overflow-x-scroll scrollbar-none"
      >
        {imageUrls.map((url, i) => (
          <Image
            style={{
              scrollSnapAlign: 'start',
            }}
            key={url}
            src={url}
            alt={`${title}: image ${i}`}
            width={imageSize}
            height={imageSize}
            className={'block rounded-md border border-gray-300 object-cover'}
          />
        ))}
      </div>
      {isOverflowing && (
        <div className="flex h-4 w-fit items-center justify-center gap-1 rounded-full px-2 py-1 backdrop-blur-lg backdrop-invert-[30%]">
          {imageUrls.map((url, i) => (
            <div
              key={url}
              className={`
              flex h-2 w-2 rounded-full bg-dark_white
              ${
                (i < indicesInView.first || indicesInView.last < i) &&
                'scale-75 opacity-30'
              }
              transition-all duration-500
            `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ZaboImageCarousel;
