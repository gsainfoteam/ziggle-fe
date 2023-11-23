'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import CloseIcon from '@/assets/icons/close.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import LongArrowIcon from '@/assets/icons/long-arrow.svg';

import Button from '../../atoms/Button';

interface ShowcaseModalProps {
  srcs: string[];
  alt: string;
  onHide: () => void;
}

const ShowcaseModal = ({
  srcs,
  alt,
  onHide,
  lng,
}: ShowcaseModalProps & PropsWithLng) => {
  const { t } = useTranslation(lng);
  const [index, setIndex] = useState(0);

  const left = useCallback(() => setIndex((prev) => Math.max(prev - 1, 0)), []);
  const right = useCallback(
    () => setIndex((prev) => Math.min(prev + 1, srcs.length - 1)),
    [srcs],
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

  const handleDownload = () => srcs.forEach(downloadImage);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-black/60"
      aria-modal
      role="modal"
    >
      <div className="absolute right-5 top-3 flex gap-7 text-sm font-medium text-white md:text-base">
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
            className={[
              'w-5 md:w-16',
              ...(index === 0 ? ['stroke-secondaryText'] : []),
            ].join(' ')}
          />
        </Button>
        <Image
          key={srcs[index]}
          src={srcs[index]}
          alt={alt}
          width={0}
          height={0}
          sizes="50vw"
          className="max-h-[75vh] w-auto max-w-[70vw] grow object-contain"
        />
        <Button disabled={index === srcs.length - 1} onClick={right}>
          <LongArrowIcon
            className={[
              'w-5 rotate-180 md:w-16',
              ...(index === srcs.length - 1 ? ['stroke-secondaryText'] : []),
            ].join(' ')}
          />
        </Button>
      </div>
      <div className="flex gap-1 bg-text p-1">
        {srcs.map((src, index) => (
          <Image
            priority={index === 0}
            key={src}
            src={src}
            alt={alt}
            width={50}
            sizes="50vw"
            height={0}
            className={'pointer box-border h-auto border'}
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
