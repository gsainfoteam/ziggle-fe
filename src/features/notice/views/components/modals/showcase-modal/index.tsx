import { useCallback, useEffect, useRef, useState } from 'react';

import {
  ArrowsInSimpleIcon,
  DownloadSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { clamp } from 'es-toolkit';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

import { Button, Dialog, Overflow } from '@/common/components';
import { cn } from '@/common/utils';

import { saveImage, saveImages } from './download';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  initialIndex?: number;
  sources: string[];
  alt: string;
}

const MAX_SCALE = 4;
const SWIPE_THRESHOLD = 60;

const actionClassName = cn(
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition hover:bg-white/15 disabled:opacity-40 md:w-full',
);

const glass = cn(
  'rounded-2xl bg-black/45 text-white ring-1 ring-white/15 backdrop-blur-xl',
);

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
    clamp(initialIndex, 0, Math.max(total - 1, 0)),
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const show = useCallback(
    (next: number) => {
      zoomRef.current?.resetTransform();
      setIndex(clamp(next, 0, total - 1));
    },
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') show(index - 1);
      if (event.key === 'ArrowRight') show(index + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, index, show]);

  const saveAll = async () => {
    if (isSavingAll) return;
    setIsSavingAll(true);
    try {
      await saveImages(sources, alt);
    } finally {
      setIsSavingAll(false);
    }
  };

  const closeIfOutsideImage = (event: React.MouseEvent) => {
    const box = imageRef.current?.getBoundingClientRect();
    const inside =
      box &&
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) onClose();
  };

  return (
    <Dialog.Root
      isOpen={isOpen}
      onClose={onClose}
      onExitComplete={onExitComplete}
      size="full"
      className="m-0 gap-0 bg-transparent p-0 shadow-none"
    >
      <div className="relative flex h-full w-full flex-col md:flex-row">
        <div
          onClick={closeIfOutsideImage}
          className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 pb-32 md:p-10 md:pr-44 md:pb-10"
        >
          <TransformWrapper
            ref={zoomRef}
            maxScale={MAX_SCALE}
            doubleClick={{ mode: 'toggle', step: 1.5 }}
            limitToBounds={isZoomed}
            panning={{ velocityDisabled: true }}
            onTransform={(_, state) => setIsZoomed(state.scale > 1)}
            onPanningStop={(ref) => {
              if (ref.state.scale > 1) return;
              const moved = ref.state.positionX;
              ref.resetTransform(0);
              if (moved <= -SWIPE_THRESHOLD) show(index + 1);
              if (moved >= SWIPE_THRESHOLD) show(index - 1);
            }}
          >
            <TransformComponent
              wrapperClass="!h-full !w-full !items-center !justify-center"
              contentClass="!h-full !w-full !items-center !justify-center"
            >
              <motion.img
                ref={imageRef}
                key={sources[index]}
                src={sources[index]}
                alt={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-h-full max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/15 select-none"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>

        <Button
          onClick={onClose}
          aria-label={t('detail.close')}
          className={cn(
            glass,
            'absolute top-4 right-4 flex size-10 items-center justify-center rounded-full transition hover:bg-black/60',
          )}
        >
          <XIcon className="size-5" />
        </Button>

        <div
          className={cn(
            glass,
            'absolute inset-x-4 bottom-4 flex items-center gap-3 p-2',
            'md:inset-x-auto md:top-1/2 md:right-4 md:bottom-auto md:w-36 md:-translate-y-1/2 md:flex-col',
          )}
        >
          {total > 1 && (
            <Overflow
              fade="12px"
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto p-0.5 md:max-h-[45vh] md:w-full md:flex-col md:overflow-x-hidden md:overflow-y-auto"
            >
              {sources.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => show(i)}
                  aria-current={i === index}
                  aria-label={`${i + 1} / ${total}`}
                  className={cn(
                    'h-12 w-auto shrink-0 cursor-pointer overflow-hidden rounded-lg transition md:h-auto md:w-full',
                    i === index
                      ? 'ring-primary ring-2'
                      : 'opacity-50 hover:opacity-100',
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className="block h-full w-auto md:h-auto md:w-full"
                  />
                </button>
              ))}
            </Overflow>
          )}

          <span className="shrink-0 text-sm font-medium tabular-nums">
            {index + 1} / {total}
          </span>

          <div className="flex shrink-0 items-center gap-1 md:w-full md:flex-col">
            {isZoomed && (
              <Button
                onClick={() => zoomRef.current?.resetTransform()}
                aria-label={t('detail.reset_zoom')}
                className={actionClassName}
              >
                <ArrowsInSimpleIcon className="size-5 shrink-0" />
                <span>{t('detail.reset_zoom')}</span>
              </Button>
            )}

            <Button
              onClick={() => saveImage(sources[index], `${alt}-${index + 1}`)}
              aria-label={t('detail.download_current')}
              className={actionClassName}
            >
              <DownloadSimpleIcon className="size-5 shrink-0" />
              <span>{t('detail.download_current')}</span>
            </Button>

            {total > 1 && (
              <Button
                onClick={saveAll}
                disabled={isSavingAll}
                className={actionClassName}
              >
                <DownloadSimpleIcon className="size-5 shrink-0" weight="fill" />
                <span>{t('detail.download_all')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
};

export default ShowcaseModal;
