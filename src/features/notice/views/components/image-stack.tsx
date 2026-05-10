import { overlay } from 'overlay-kit';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import ShowcaseModal from './showcase-modal';

interface ImageStackProps {
  width?: number;
  sources: string[];
  alt: string;
}

const ImageStack = ({ width, sources, alt }: ImageStackProps) => {
  const onImageClick = (index: number) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <ShowcaseModal
        isOpen={isOpen}
        onClose={close}
        onExitComplete={unmount}
        sources={sources}
        alt={alt}
        initialIndex={index}
      />
    ));
  };

  return (
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
  );
};

export default ImageStack;
