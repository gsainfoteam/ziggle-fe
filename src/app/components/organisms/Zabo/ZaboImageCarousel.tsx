'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ZaboImageCarouselProps {
  imageUrls: string[];
  title: string;
  imageSize?: number;
  gap?: number;
  maxControls?: number;
}

const ZaboImageCarousel = ({
  imageUrls,
  title,
  imageSize = 200,
  gap = 8,
  maxControls = 6,
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
      last:
        Math.floor(e.currentTarget.scrollLeft / (imageSize + gap)) +
        Math.floor(
          (e.currentTarget.clientWidth + gap + imageSize) / (imageSize + gap),
        ) - 1,
    });
  };

  console.log(indicesInView);

  const isOverflowing = indicesInView.last < imageUrls.length;
  const thereAreMoreImagesthanMax = maxControls < imageUrls.length;

  return (
    <div className="flex w-full flex-col items-center gap-2 group">
      <div
        ref={imagesContainerRef}
        onScroll={handleScroll}
        style={{
          scrollSnapStop: 'normal',
          scrollSnapType: 'x mandatory',
          gap: gap,
          maxHeight: imageSize,
          overscrollBehaviorX: 'contain',
        }}
        className="relative flex w-fit max-w-full overflow-y-hidden overflow-x-scroll scrollbar-none"
      >
        {imageUrls.map((url, i) => (
          <Image
            style={{
              scrollSnapAlign: 'start',
              minWidth: imageSize, 
              minHeight: imageSize
            }}
            key={url}
            src={url}
            alt={`${title}: image ${i + 1}`}
            width={imageSize}
            height={imageSize}
            className={'block rounded-md border border-gray-300 object-cover'}
          />
        ))}
      </div>
      {indicesInView.last <= imageUrls.length && (
        <div className="group-hover:opacity-100 opacity-0 flex h-4 w-fit items-center justify-center rounded-full px-2 py-1 backdrop-blur-lg backdrop-invert-[30%] transition-opacity duration-500">
          {imageUrls.map((url, i) => (
            <div
              key={url}
              className={`
              flex rounded-full bg-dark_white
              ${
                i < indicesInView.first - 2 || indicesInView.first + maxControls - 1 < i
                  ? 'mx-0 h-0 w-0'
                  : 'mx-1 h-2 w-2' +
                    (i == indicesInView.first + maxControls - 2 || i == indicesInView.first - 1
                      ? ' scale-75'
                      : i == indicesInView.first + maxControls - 1 || i == indicesInView.first - 2
                        ? ' scale-50'
                        : '')
              }
              ${
                (i < indicesInView.first || indicesInView.last < i) &&
                ' opacity-30'
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
