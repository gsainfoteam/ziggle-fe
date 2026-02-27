import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import CloseIcon from '@/assets/icons/close.svg?react';
import DownloadIcon from '@/assets/icons/download.svg?react';
import LongArrowIcon from '@/assets/icons/long-arrow.svg?react';
import { Button } from '@/common/components';
import { cn } from '@/common/utils';

interface ShowcaseModalProps {
  initialIndex?: number;
  sources: string[];
  alt: string;
  onHide: () => void;
}

const ShowcaseModal = ({
  initialIndex = 0,
  sources,
  alt,
  onHide,
}: ShowcaseModalProps) => {
  const { t } = useTranslation('notice');
  const [index, setIndex] = useState(initialIndex);

  const left = useCallback(() => setIndex((prev) => Math.max(prev - 1, 0)), []);
  const right = useCallback(
    () => setIndex((prev) => Math.min(prev + 1, sources.length - 1)),
    [sources],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onHide();
      if (e.key === 'ArrowLeft') return left();
      if (e.key === 'ArrowRight') return right();
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [left, onHide, right]);

  const handleDownload = () => sources.forEach(downloadImage);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/60"
      aria-modal
      role="modal"
    >
      <div className="absolute top-3 right-5 flex gap-7 text-sm font-medium text-white md:text-base">
        <Button className="flex items-center gap-2" onClick={handleDownload}>
          {t('zabo.downloadAll')}
          <DownloadIcon className="w-6 md:w-8" />
        </Button>
        <Button className="flex items-center gap-2" onClick={onHide}>
          {t('zabo.close')}
          <CloseIcon className="w-4 md:w-6" />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-5 md:gap-12">
        <Button disabled={index === 0} onClick={left}>
          <LongArrowIcon
            className={cn('w-5 md:w-16', index === 0 && 'stroke-secondaryText')}
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
          <LongArrowIcon
            className={cn(
              'w-5 rotate-180 md:w-16',
              index === sources.length - 1 && 'stroke-secondaryText',
            )}
          />
        </Button>
      </div>
      <div className="bg-text flex gap-1 p-1">
        {sources.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={alt}
            width={50}
            sizes="50vw"
            height={0}
            className="pointer box-border h-auto border"
            onClick={() => setIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const downloadImage = (src: string) => {
  const link = document.createElement('a');
  link.href = src;
  link.download = src.split('/').pop() || 'image';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default ShowcaseModal;
