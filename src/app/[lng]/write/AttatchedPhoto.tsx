import Image from 'next/image';

import CloseIcon from '@/assets/icons/close.svg';

interface ImagePreviewItemProps {
  src: string;
  onDeleteClick: () => void;
}

const AttatchedPhoto = ({ src, onDeleteClick }: ImagePreviewItemProps) => {
  return (
    <div className="flex relative overflow-hidden rounded-md md:rounded-xl">
      <Image alt="preview image" src={src} className="w-full h-full" />

      <div className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 bg-primary p-1 rounded-md">
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default AttatchedPhoto;
