import type { PointerEvent, ReactNode } from 'react';

import type { VariantProps } from 'tailwind-variants';

import { cn, cv } from '@/common/utils';

const panelShell = cv({
  base: 'flex w-full flex-col md:h-[calc(100vh-3.25rem)] md:shrink-0 md:transition-[width] md:duration-200',
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

const borderedPanelClass =
  'md:rounded-2xl md:border md:border-greyBorder md:dark:border-dark_greyBorder md:bg-white md:p-5';

export function PanelShell({
  title,
  titleIcon,
  headerRight,
  children,
  leading,
  aside,
  className,
  size,
  onHeaderPointerDown,
}: {
  title?: ReactNode;
  titleIcon?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  /** 패널 왼쪽 바깥 (데스크탑) */
  leading?: ReactNode;
  /** 패널 오른쪽 바깥 (데스크탑) */
  aside?: ReactNode;
  className?: string;
  onHeaderPointerDown?: (e: PointerEvent) => void;
} & VariantProps<typeof panelShell>) {
  const panelWidthClass = panelShell({ size })
    .split(' ')
    .filter((token) => token.startsWith('md:w-'));

  const titleHeader = title ? (
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
  ) : null;

  if (leading || aside) {
    return (
      <div className="flex w-full flex-col md:h-[calc(100vh-3.25rem)] md:w-auto md:shrink-0">
        {titleHeader}

        <div className="flex min-h-0 flex-1 items-stretch gap-2">
          {leading ? (
            <div className="hidden shrink-0 self-start md:block">{leading}</div>
          ) : null}

          <section
            className={cn(
              'scrollbar-none flex min-h-0 min-w-0 flex-1 flex-col md:overflow-y-auto',
              borderedPanelClass,
              panelWidthClass,
              className,
            )}
          >
            {children}
          </section>

          {aside ? (
            <div className="hidden shrink-0 items-center md:flex">{aside}</div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={panelShell({ size })}>
      {titleHeader}

      <section
        className={cn(
          'scrollbar-none flex w-full flex-col md:min-h-0 md:flex-1 md:overflow-y-auto',
          borderedPanelClass,
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
