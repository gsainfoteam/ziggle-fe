import { useCallback, useEffect, useState } from 'react';

import {
  CaretLeftIcon,
  CaretRightIcon,
  DownloadSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button, Dialog } from '@/common/components';
import { cn } from '@/common/utils';

import { downloadImage, openInNewTab } from './download';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  initialIndex?: number;
  sources: string[];
  alt: string;
}

const SWIPE_THRESHOLD = 60;

const controlClassName =
  'flex items-center justify-center rounded-full p-2 text-white transition hover:bg-white/15 disabled:pointer-events-none disabled:opacity-30';

const ShowcaseModal = ({
  isOpen,
  onClose,
  onExitComplete,
  initialIndex = 0,
  sources,
  alt,
}: ShowcaseModalProps) => {
  const { t } = useTranslation('notice');
  const total = sources.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(total - 1, 0)),
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const go = useCallback(
    (delta: number) =>
      setIndex((prev) => Math.min(Math.max(prev + delta, 0), total - 1)),
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, go]);

  const save = async (targets: number[]) => {
    setIsDownloading(true);
    let failed = 0;
    for (const i of targets) {
      try {
        await downloadImage(sources[i], `${alt}-${i + 1}`);
      } catch {
        failed += 1;
        openInNewTab(sources[i]);
      }
    }
    setIsDownloading(false);
    if (failed > 0) toast.error(t('detail.download_failed'));
  };

  const stopClose = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onClose}
      onExitComplete={onExitComplete}
      size="full"
      backdrop="dark"
      className="m-0 gap-0 bg-transparent p-0 shadow-none"
    >
      {/* 이미지 바깥 어디를 눌러도 닫힌다. 컨트롤과 이미지는 전파를 막는다. */}
      <div className="flex h-full w-full flex-col" onClick={onClose}>
        <header
          className="flex shrink-0 items-center justify-between gap-3 px-4 py-3"
          onClick={stopClose}
        >
          <span className="text-sm font-medium text-white tabular-nums md:text-base">
            {index + 1} / {total}
          </span>

          <div className="flex items-center gap-1">
            <Button
              className={controlClassName}
              onClick={() => save([index])}
              disabled={isDownloading}
              aria-label={t('detail.download_current')}
            >
              <DownloadSimpleIcon className="size-6" />
            </Button>

            {total > 1 && (
              <Button
                className={cn(controlClassName, 'gap-2 px-3')}
                onClick={() => save(sources.map((_, i) => i))}
                disabled={isDownloading}
              >
                <span className="hidden text-sm sm:inline md:text-base">
                  {t('detail.download_all')}
                </span>
                <DownloadSimpleIcon className="size-6 sm:hidden" />
              </Button>
            )}

            <Button
              className={controlClassName}
              onClick={onClose}
              aria-label={t('detail.close')}
            >
              <XIcon className="size-6" />
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 md:gap-6 md:px-6">
          {total > 1 && (
            <Button
              className={cn(controlClassName, 'shrink-0')}
              onClick={(event) => {
                stopClose(event);
                go(-1);
              }}
              disabled={index === 0}
              aria-label={t('detail.previous_image')}
            >
              <CaretLeftIcon className="size-6 md:size-10" />
            </Button>
          )}

          <motion.img
            key={sources[index]}
            src={sources[index]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x <= -SWIPE_THRESHOLD) go(1);
              if (info.offset.x >= SWIPE_THRESHOLD) go(-1);
            }}
            onClick={stopClose}
            draggable={false}
            className="max-h-full min-h-0 max-w-full object-contain select-none"
          />

          {total > 1 && (
            <Button
              className={cn(controlClassName, 'shrink-0')}
              onClick={(event) => {
                stopClose(event);
                go(1);
              }}
              disabled={index === total - 1}
              aria-label={t('detail.next_image')}
            >
              <CaretRightIcon className="size-6 md:size-10" />
            </Button>
          )}
        </div>

        {total > 1 && (
          <div
            className="flex shrink-0 justify-center gap-2 overflow-x-auto p-4"
            onClick={stopClose}
          >
            {sources.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                aria-label={`${i + 1} / ${total}`}
                className={cn(
                  'size-14 shrink-0 cursor-pointer overflow-hidden rounded-md transition',
                  i === index
                    ? 'ring-primary ring-2'
                    : 'opacity-50 hover:opacity-100',
                )}
              >
                <img src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog.Root>
  );
};

export default ShowcaseModal;
