import { useCallback, useEffect, useRef, useState } from 'react';

import {
  ArrowsInSimpleIcon,
  DownloadSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { clamp } from 'es-toolkit';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/common/components';
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
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  const isZoomed = scale > 1;

  const show = useCallback(
    (next: number) => {
      setIndex((prev) => {
        const target = clamp(next, 0, total - 1);
        if (target !== prev) setScale(1);
        return target;
      });
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

  /** 트랙패드 핀치는 ctrlKey 가 붙은 wheel 로 들어온다. 휠 스크롤도 같이 받는다. */
  const handleWheel = (event: React.WheelEvent) => {
    setScale((prev) => clamp(prev - event.deltaY * 0.005, 1, MAX_SCALE));
  };

  const distanceBetweenPointers = () => {
    const [a, b] = Array.from(pointers.current.values());
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (pointers.current.size === 2) {
      pinchStart.current = { distance: distanceBetweenPointers(), scale };
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const start = pinchStart.current;
    if (!start || pointers.current.size !== 2) return;
    const ratio = distanceBetweenPointers() / start.distance;
    setScale(clamp(start.scale * ratio, 1, MAX_SCALE));
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
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
        {/* 이미지 바깥을 누르면 닫힌다. 이미지와 컨트롤은 전파를 막는다. */}
        <div
          ref={stageRef}
          onClick={onClose}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 pb-32 md:p-10 md:pr-44 md:pb-10"
        >
          <motion.img
            key={sources[index]}
            src={sources[index]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale }}
            drag={isZoomed || total > 1}
            dragDirectionLock={!isZoomed}
            dragConstraints={
              isZoomed ? stageRef : { left: 0, right: 0, top: 0, bottom: 0 }
            }
            dragElastic={isZoomed ? 0 : 0.15}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (isZoomed) return;
              if (info.offset.x <= -SWIPE_THRESHOLD) show(index + 1);
              if (info.offset.x >= SWIPE_THRESHOLD) show(index - 1);
            }}
            onDoubleClick={(event) => {
              event.stopPropagation();
              setScale((prev) => (prev > 1 ? 1 : 2.5));
            }}
            onClick={(event) => event.stopPropagation()}
            draggable={false}
            className={cn(
              'max-h-full max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/15 select-none',
              isZoomed ? 'cursor-grab active:cursor-grabbing' : 'touch-pan-y',
            )}
          />
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
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto rounded-xl p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:max-h-[45vh] md:w-full md:flex-col md:overflow-x-hidden md:overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
            </div>
          )}

          <span className="shrink-0 text-sm font-medium tabular-nums">
            {index + 1} / {total}
          </span>

          <div className="flex shrink-0 items-center gap-1 md:w-full md:flex-col">
            {isZoomed && (
              <Button
                onClick={() => setScale(1)}
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
                onClick={() => saveImages(sources, alt)}
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
