import Image from 'next/image';

import CloseIcon from '@/assets/icons/close.svg';

interface ImagePreviewItemProps {
  src: string;
  onDeleteClick: () => void;
}

const AttatchedPhoto = ({ src, onDeleteClick }: ImagePreviewItemProps) => {
  return (
    <div className="flex relative overflow-hidden rounded-md md:rounded-xl [&>img]:object-contain">
      <Image alt="preview image" src={src} fill />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 bg-primary p-1 rounded-md"
      >
        <div className="flex">
          <CloseIcon className="w-2.5 h-2.5 md:w-4 md:h-4 fill-white" />
        </div>
      </button>
    </div>
  );
};

export default AttatchedPhoto;
