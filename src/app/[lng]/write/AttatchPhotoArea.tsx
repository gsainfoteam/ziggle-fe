import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import Button from '@/app/components/atoms/Button';
import { PropsWithT } from '@/app/i18next';
import AddIcon from '@/assets/icons/add.svg';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';

import AttatchedPhoto from './AttatchedPhoto';

export interface FileWithUrl {
  file: File;
  url: string;
}

interface AttatchPhotoAreaProps {
  photos: FileWithUrl[];
  setPhotos: Dispatch<SetStateAction<FileWithUrl[]>>;
}

const AttatchPhotoArea = ({
  photos,
  setPhotos,
  t,
}: PropsWithT<AttatchPhotoAreaProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedfiles = Array.from(event.dataTransfer.files);

    setPhotos((prev) => [
      ...prev,
      ...droppedfiles.map((file) => ({
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
    setPhotos((prev) => [
      ...prev,
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
        className="flex items-center justify-center border-2 border-dashed border-secondaryText"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {photos.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-1.5 p-1.5 md:gap-3 md:p-2.5">
            {photos.map((file, index) => (
              <AttatchedPhoto
                key={index}
                src={file.url}
                onDeleteClick={() => {
                  setPhotos((prev) => [
                    ...prev.slice(0, index),
                    ...prev.slice(index + 1),
                  ]);
                  URL.revokeObjectURL(file.url);
                }}
              />
            ))}
            <button
              className={
                'aspect-square rounded-md bg-deselected md:rounded-xl ' +
                'flex items-center justify-center'
              }
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <AddPhotoIcon className="w-[90px] fill-white dark:fill-black" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8 md:py-12">
            <AddIcon className="w-[45px] fill-secondaryText md:w-[90px]" />

            <div className="text-base font-bold text-secondaryText md:text-2xl">
              {t('write.dragToAddPhoto')}
            </div>

            <Button
              variant="contained"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="mx-3 my-2 md:mx-4 md:my-3"
            >
              <div className="text-sm font-medium md:text-base">
                {t('write.orAddFromPC')}
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AttatchPhotoArea;
