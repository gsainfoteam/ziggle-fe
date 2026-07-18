import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { Button, Dialog } from '@/common/components';
import { cn } from '@/common/utils';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  initialIndex?: number;
  sources: string[];
  alt: string;
}

const downloadImage = (src: string) => {
  const link = document.createElement('a');
  link.href = src;
  link.download = src.split('/').pop() || 'image';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ShowcaseModal = ({
  isOpen,
  onClose,
  onExitComplete,
  initialIndex = 0,
  sources,
  alt,
}: ShowcaseModalProps) => {
  const { t } = useTranslation('notice');
  const [index, setIndex] = useState(initialIndex);

  const left = useCallback(() => setIndex((prev) => Math.max(prev - 1, 0)), []);
  const right = useCallback(
    () => setIndex((prev) => Math.min(prev + 1, sources.length - 1)),
    [sources],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') return left();
      if (event.key === 'ArrowRight') return right();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [isOpen, left, right]);

  const handleDownload = () => sources.forEach(downloadImage);

  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onClose}
      onExitComplete={onExitComplete}
      size="full"
      className="/90 flex items-center justify-center gap-3 bg-black/90 p-0"
    >
      <div className="absolute top-3 right-5 z-10 flex gap-7 text-sm font-medium text-white md:text-base">
        <Button className="flex items-center gap-2" onClick={handleDownload}>
          {t('detail.download_all')}
          <DownloadSimpleIcon className="size-6 md:size-8" />
        </Button>
      </div>
      <Dialog.Close
        className="hover:bg-background/10 text-white"
        aria-label={t('detail.close')}
      />
      <div className="flex w-full items-center justify-center gap-5 md:gap-12">
        <Button disabled={index === 0} onClick={left}>
          <ArrowRightIcon
            className={cn('size-5 md:size-16', index === 0 && 'text-subtle')}
          />
        </Button>
        <img
          key={sources[index]}
          src={sources[index]}
          alt={alt}
          width={0}
          height={0}
          sizes="50vw"
          className="max-h-[75vh] w-auto max-w-[70vw] grow object-contain"
        />
        <Button disabled={index === sources.length - 1} onClick={right}>
          <ArrowRightIcon
            className={cn(
              'size-5 rotate-180 md:size-16',
              index === sources.length - 1 && 'text-subtle',
            )}
          />
        </Button>
      </div>
      <div className="bg-foreground absolute bottom-4 flex gap-1 p-1">
        {sources.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            width={50}
            sizes="50vw"
            height={0}
            className={cn(
              'pointer box-border h-auto cursor-pointer border',
              i === index && 'border-primary',
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </Dialog.Root>
  );
};

export default ShowcaseModal;
