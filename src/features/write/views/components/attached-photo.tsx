import CloseIcon from '@/assets/icons/close.svg?react';

interface ImagePreviewItemProps {
  src: string;
  onDeleteClick: () => void;
}

export const AttachedPhoto = ({
  src,
  onDeleteClick,
}: ImagePreviewItemProps) => {
  return (
    <div className="relative flex">
      <img
        alt="preview image"
        src={src}
        width={0}
        height={0}
        sizes="30vw"
        className="aspect-square h-auto w-full rounded-[4px] object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className="bg-greyDark absolute -top-2 -right-2 rounded-full p-1"
      >
        <div className="flex">
          <CloseIcon className="h-4 w-4 stroke-white md:h-4 md:w-4" />
        </div>
      </button>
    </div>
  );
};
