import Image from 'next/image';

import CloseIcon from '@/assets/icons/close.svg';

interface ImagePreviewItemProps {
  src: string;
  onDeleteClick: () => void;
}

const AttatchedPhoto = ({ src, onDeleteClick }: ImagePreviewItemProps) => {
  return (
    <div className="relative flex overflow-hidden rounded-md md:rounded-xl [&>img]:object-contain">
      <Image alt="preview image" src={src} fill />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className="absolute right-1.5 top-1.5 rounded-md bg-primary p-1 md:right-2.5 md:top-2.5"
      >
        <div className="flex">
          <CloseIcon className="h-2.5 w-2.5 fill-white md:h-4 md:w-4" />
        </div>
      </button>
    </div>
  );
};

export default AttatchedPhoto;
