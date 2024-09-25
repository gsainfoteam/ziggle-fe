import { Dispatch, SetStateAction, useRef } from 'react';

import Button from '@/app/components/shared/Button';
import { PropsWithT } from '@/app/i18next';
import AddPhotoGray from '@/assets/icons/add-photo-gray.svg';

import AttachedPhoto from './AttachedPhoto';

export interface FileWithUrl {
  file: File;
  url: string;
}

interface AttachPhotoAreaProps {
  photos: FileWithUrl[];
  setPhotos: Dispatch<SetStateAction<FileWithUrl[]>>;
}

const AttachPhotoArea = ({
  photos,
  setPhotos,
  t,
}: PropsWithT<AttachPhotoAreaProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);

    setPhotos((prev) => [
      ...prev,
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
        className={
          'flex items-center justify-center ' +
          (photos.length > 0
            ? 'bg-greyLight p-[5px]'
            : 'rounded-[5px] border border-dashed border-secondaryText')
        }
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
                'flex aspect-square items-center justify-center rounded-[4px] bg-white'
              }
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

            <div className="mt-[5px] text-xs font-medium text-secondaryText">
              {t('write.dragToAddPhoto')}
            </div>

            <Button
              variant="contained"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="mx-3 my-[10px] bg-greyDark px-3 py-[5px] md:mx-4 md:my-3 md:px-3 md:py-[5px]"
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

export default AttachPhotoArea;
