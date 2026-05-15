import { overlay } from 'overlay-kit';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import ShowcaseModal from '../modals/showcase-modal';

interface ImageStackProps {
  width?: number;
  sources: string[];
  alt: string;
}

export const NoticeDetailImageStack = ({
  width,
  sources,
  alt,
}: ImageStackProps) => {
  if (sources.length === 0) return null;
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
        <div key={src} className="relative">
          <LogClick eventName={LogEvents.detailClickImage}>
            <button
              type="button"
              onClick={() => onImageClick(i)}
              className="block cursor-pointer text-left"
            >
              <img
                src={src}
                alt={alt}
                width={width ?? 400}
                height={300}
                className="border-greyBorder shrink-0 basis-48 rounded-[10px] border-2 object-cover md:basis-80"
              />
            </button>
          </LogClick>
        </div>
      ))}
    </div>
  );
};
