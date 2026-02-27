import React, { useRef, useState } from 'react';

import { cn } from '@/common/utils';

interface ZaboImageCarouselProps {
  imageUrls: string[];
  title: string;
  imageSize?: number;
  gap?: number;
  maxControls?: number;
}

export const ZaboImageCarousel = ({
  imageUrls,
  title,
  imageSize = 200,
  gap = 8,
  maxControls = 6,
}: ZaboImageCarouselProps) => {
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [indicesInView, setIndicesInView] = useState({ first: 0, last: 0 });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIndicesInView({
      first: Math.floor((e.currentTarget.scrollLeft + gap) / (imageSize + gap)),
      last:
        Math.floor(e.currentTarget.scrollLeft / (imageSize + gap)) +
        Math.floor(
          (e.currentTarget.clientWidth + gap + imageSize) / (imageSize + gap),
        ) -
        1,
    });
  };

  return (
    <div className="group flex w-full flex-col items-center gap-2">
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
        className="scrollbar-none relative flex w-fit max-w-full overflow-x-scroll overflow-y-hidden"
      >
        {imageUrls.map((url, i) => (
          <img
            style={{
              scrollSnapAlign: 'start',
              minWidth: imageSize,
              minHeight: imageSize,
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
        <div className="flex h-4 w-fit items-center justify-center rounded-full px-2 py-1 opacity-0 backdrop-blur-lg backdrop-invert-30 transition-opacity duration-500 group-hover:opacity-100">
          {imageUrls.map((url, i) => {
            const leftOuter = indicesInView.first - 2;
            const rightOuter = indicesInView.first + maxControls - 1;
            return (
              <div
                key={url}
                className={cn(
                  'bg-dark_white flex rounded-full transition-all duration-500',
                  // out of view
                  (i < leftOuter || rightOuter < i) && 'mx-0 h-0 w-0',
                  // in view
                  leftOuter <= i && i <= rightOuter && 'mx-1 h-2 w-2',
                  // margin + 1
                  (i == leftOuter + 1 || i == rightOuter - 1) &&
                    'scale-75 opacity-30',
                  // margin
                  (i == leftOuter || i == rightOuter) && 'scale-50 opacity-30',
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
