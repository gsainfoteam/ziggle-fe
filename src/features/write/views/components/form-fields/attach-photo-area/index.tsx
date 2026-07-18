import { useRef } from 'react';

import { ImageIcon } from '@phosphor-icons/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components';
import { cn } from '@/common/utils';
import type {
  FileWithUrl,
  NoticeFormValues,
} from '@/features/write/viewmodels';

import { AttachedPhoto } from '../attached-photo';

export const AttachPhotoArea = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { field } = useController({ control, name: 'photos' });
  const photos = field.value;
  const setPhotos = (next: FileWithUrl[]) => field.onChange(next);

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
        id="file-input"
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      <label htmlFor="file-input" />

      <div
        className={cn(
          'flex items-center justify-center rounded-xl',
          photos.length > 0
            ? 'bg-muted p-2'
            : 'border-border border border-dashed bg-transparent',
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {photos.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-3 p-1.5 md:grid-cols-3 md:p-2.5">
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
              type="button"
              className="border-border bg-background text-muted-foreground hover:bg-muted flex aspect-square items-center justify-center rounded-lg border border-dashed transition"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <ImageIcon className="size-8" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-10 md:py-14">
            <ImageIcon className="text-muted-foreground size-10" />
            <p className="text-muted-foreground text-xs font-medium">
              {t('fields.photo.drag')}
            </p>
            <Button
              variant="muted"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="text-sm"
            >
              {t('fields.photo.browse')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
