'use client';

import Image from 'next/image';
import { useState } from 'react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import { PropsWithLng } from '@/app/i18next';

import ShowcaseModal from './ShowcaseModal';

interface ImageStackProps {
  width?: number;
  sources: string[];
  alt: string;
}

const ImageStack = ({
  width,
  sources,
  alt,
  lng,
}: PropsWithLng<ImageStackProps>) => {
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const onImageClick = (index: number) => {
    setIsShowcaseOpen(() => {
      setInitialIndex(index);
      return true;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        {sources.map((src, i) => (
          <div key={src} className="relative cursor-pointer">
            <Analytics event={LogEvents.detailClickImage}>
              <Image
                src={src}
                alt={alt}
                width={width ?? 400}
                height={300}
                onClick={() => onImageClick(i)}
                className="shrink-0 basis-48 rounded-[10px] border-2 border-greyBorder object-cover md:basis-80"
              />
            </Analytics>
          </div>
        ))}
      </div>

      {isShowcaseOpen && (
        <div className="hidden md:block">
          <ShowcaseModal
            srcs={sources}
            alt={alt}
            lng={lng}
            onHide={() => setIsShowcaseOpen(false)}
            initialIndex={initialIndex}
          />
        </div>
      )}
    </>
  );
};

export default ImageStack;
