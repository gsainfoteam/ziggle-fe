import { overlay } from 'overlay-kit';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import ShowcaseModal from '../modals/showcase-modal';

interface ImageStackProps {
  sources: string[];
  alt: string;
}

export const NoticeDetailImageStack = ({ sources, alt }: ImageStackProps) => {
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
    <div className="flex gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {sources.map((src, i) => (
        <LogClick key={src} eventName={LogEvents.detailClickImage}>
          <button
            type="button"
            onClick={() => onImageClick(i)}
            className="block shrink-0 cursor-pointer text-left"
          >
            <img
              src={src}
              alt={alt}
              className="border-border h-72 w-auto rounded-[10px] border object-contain"
            />
          </button>
        </LogClick>
      ))}
    </div>
  );
};
