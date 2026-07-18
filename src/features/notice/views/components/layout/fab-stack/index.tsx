import { useEffect, useRef, useState } from 'react';

import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { ChatbotFab } from '../chatbot-fab';
import { WriteFab } from '../write-fab';

/** 데스크탑 우하단 스피드 다이얼. 모바일은 하단 탭으로 대체. */
export function FabStack() {
  const { t } = useTranslation('layout');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="fixed right-5 bottom-5 z-40 hidden md:block">
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'absolute bottom-full mb-3 flex flex-col items-center gap-3 transition duration-200',
            open
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0',
          )}
        >
          <ChatbotFab onActivate={close} />
          <WriteFab onActivate={close} />
        </div>

        <button
          type="button"
          aria-label={open ? t('fab.close') : t('fab.open')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active flex size-12 items-center justify-center rounded-2xl shadow-lg transition active:scale-95"
        >
          <PlusIcon
            weight="bold"
            className={cn(
              'size-6 transition-transform duration-200',
              open && 'rotate-45',
            )}
          />
        </button>
      </div>
    </div>
  );
}
