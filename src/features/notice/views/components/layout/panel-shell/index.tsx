import type { PointerEvent, ReactNode } from 'react';

import type { VariantProps } from 'tailwind-variants';

import { cn, cv } from '@/common/utils';

const panelShell = cv({
  base: 'flex w-full flex-col md:my-4 md:h-[calc(100vh-2rem)] md:shrink-0 md:transition-[width] md:duration-200',
  variants: {
    size: {
      wide: 'md:w-180',
      default: 'md:w-140',
      compact: 'md:w-120',
    },
  },
  defaultVariants: {
    size: 'wide',
  },
});

export type PanelSize = NonNullable<VariantProps<typeof panelShell>['size']>;

export function PanelShell({
  title,
  titleIcon,
  headerRight,
  children,
  className,
  size,
  onHeaderPointerDown,
}: {
  title?: ReactNode;
  titleIcon?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  /** 있으면 헤더(제목 영역) 전체가 드래그 시작점이 된다 (덱 정렬용) */
  onHeaderPointerDown?: (e: PointerEvent) => void;
} & VariantProps<typeof panelShell>) {
  return (
    <div className={panelShell({ size })}>
      {title && (
        <header
          onPointerDown={onHeaderPointerDown}
          className={cn(
            'flex shrink-0 items-center justify-between gap-2 px-2 pb-3',
            onHeaderPointerDown && 'cursor-grab touch-none select-none',
          )}
        >
          <h1 className="text-text dark:text-dark_white flex min-w-0 items-center gap-2 text-2xl font-bold">
            {titleIcon && (
              <span className="text-primary flex shrink-0 items-center [&>svg]:size-7">
                {titleIcon}
              </span>
            )}
            <span className="truncate">{title}</span>
          </h1>
          {headerRight}
        </header>
      )}

      <section
        className={cn(
          'scrollbar-none flex w-full flex-col',
          'md:min-h-0 md:flex-1 md:overflow-y-auto md:rounded-2xl md:p-4',
          'md:border-greyBorder md:dark:border-dark_greyBorder md:border md:bg-white',
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
