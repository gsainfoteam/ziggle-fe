import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface ImagePreviewItemProps {
  src: string;
  onDeleteClick: () => void;
}

export const AttachedPhoto = ({
  src,
  onDeleteClick,
}: ImagePreviewItemProps) => {
  const { t } = useTranslation('write');
  return (
    <div className="relative flex">
      <img
        alt={t('fields.photo.preview')}
        src={src}
        width={0}
        height={0}
        sizes="30vw"
        className="aspect-square h-auto w-full rounded-sm object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        className="bg-muted-foreground absolute -top-2 -right-2 rounded-full p-1"
      >
        <div className="flex">
          <XIcon className="size-4 text-white" />
        </div>
      </button>
    </div>
  );
};
