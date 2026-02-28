import { useState } from 'react';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import ShowcaseModal from './showcase-modal';

interface ImageStackProps {
  width?: number;
  sources: string[];
  alt: string;
}

const ImageStack = ({ width, sources, alt }: ImageStackProps) => {
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
            <LogClick eventName={LogEvents.detailClickImage}>
              <img
                src={src}
                alt={alt}
                width={width ?? 400}
                height={300}
                onClick={() => onImageClick(i)}
                className="border-greyBorder shrink-0 basis-48 rounded-[10px] border-2 object-cover md:basis-80"
              />
            </LogClick>
          </div>
        ))}
      </div>

      {isShowcaseOpen && (
        <div className="hidden md:block">
          <ShowcaseModal
            sources={sources}
            alt={alt}
            onHide={() => setIsShowcaseOpen(false)}
            initialIndex={initialIndex}
          />
        </div>
      )}
    </>
  );
};

export default ImageStack;
