import { useRef } from 'react';

import { useTranslation } from 'react-i18next';

import AddPhotoGray from '@/assets/icons/add-photo-gray.svg?react';
import { Button } from '@/common/components';
import { cn } from '@/common/utils';

import { AttachedPhoto } from './attached-photo';

export interface FileWithUrl {
  file: File;
  url: string;
}

interface AttachPhotoAreaProps {
  photos: FileWithUrl[];
  setPhotos: (photos: FileWithUrl[]) => void;
}

export const AttachPhotoArea = ({
  photos,
  setPhotos,
}: AttachPhotoAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('notice');

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setPhotos([
      ...photos,
      ...droppedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setPhotos([
      ...photos,
      ...selectedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
    event.target.value = '';
  };

  return (
    <>
      <input
        className="hidden"
        id={'file-input'}
        type={'file'}
        accept={'image/*'}
        multiple
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{
          display: 'none',
        }}
      />
      <label htmlFor="file-input" />

      <div
        className={cn(
          'flex items-center justify-center',
          photos.length > 0
            ? 'bg-greyLight p-[5px]'
            : 'border-secondaryText rounded-[5px] border border-dashed',
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {photos.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-[15px] p-1.5 md:grid-cols-3 md:p-2.5">
            {photos.map((file, index) => (
              <AttachedPhoto
                key={index}
                src={file.url}
                onDeleteClick={() => {
                  setPhotos([
                    ...photos.slice(0, index),
                    ...photos.slice(index + 1),
                  ]);
                  URL.revokeObjectURL(file.url);
                }}
              />
            ))}
            <button
              className="flex aspect-square items-center justify-center rounded-[4px] bg-white"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <AddPhotoGray className="fill-white" width={'40px'} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8 md:py-12">
            <AddPhotoGray className="" />

            <div className="text-secondaryText mt-[5px] text-xs font-medium">
              {t('write.dragToAddPhoto')}
            </div>

            <Button
              variant="contained"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="bg-greyDark mx-3 my-[10px] px-3 py-[5px] md:mx-4 md:my-3 md:px-3 md:py-[5px]"
            >
              <div className="text-xs font-medium md:text-base">
                {t('write.orAddFromPC')}
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
