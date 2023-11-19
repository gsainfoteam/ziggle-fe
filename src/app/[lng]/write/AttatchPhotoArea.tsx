import { useEffect, useRef } from 'react';

import Button from '@/app/components/atoms/Button';
import { T } from '@/app/i18next';
import AddIcon from '@/assets/icons/add.svg';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';

import AttatchedPhoto from './AttatchedPhoto';

interface AttatchPhotoAreaProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const AttatchPhotoArea = ({
  files,
  setFiles,
  t,
}: AttatchPhotoAreaProps & { t: T }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedfiles = Array.from(event.dataTransfer.files);

    setFiles([...files, ...droppedfiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
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
        className="border-secondayText flex items-center justify-center border-2 border-dashed"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {files.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-1.5 p-1.5 md:gap-3 md:p-2.5">
            {files.map((file, index) => (
              <AttatchedPhoto
                key={index}
                src={URL.createObjectURL(file)}
                onDeleteClick={() => {
                  setFiles(files.filter((f) => f !== file));
                  URL.revokeObjectURL(URL.createObjectURL(file));
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
            <AddIcon className="fill-secondayText w-[45px] md:w-[90px]" />

            <div className="text-secondayText text-base font-bold md:text-2xl">
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
