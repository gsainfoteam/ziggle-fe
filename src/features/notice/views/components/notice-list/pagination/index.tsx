import { useEffect, useId, useRef, useState } from 'react';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { clamp, range } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components';
import { cn } from '@/common/utils';

interface PaginationProps {
  items: number;
  itemsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

type PageItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; slot: 'left' | 'right' };

const toPageItem = (page: number): PageItem => ({ type: 'page', page });

const getPageItems = (current: number, total: number): PageItem[] => {
  const siblingCount = 1;
  const maxVisible = siblingCount * 2 + 5;

  if (total <= maxVisible) {
    return range(total).map(toPageItem);
  }

  const leftSibling = clamp(current - siblingCount, 1, total - 2);
  const rightSibling = clamp(current + siblingCount, 1, total - 2);

  const showLeftEllipsis = leftSibling > 1;
  const showRightEllipsis = rightSibling < total - 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblingCount;
    return [
      ...range(leftCount).map(toPageItem),
      { type: 'ellipsis', slot: 'right' },
      toPageItem(total - 1),
    ];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblingCount;
    return [
      toPageItem(0),
      { type: 'ellipsis', slot: 'left' },
      ...range(total - rightCount, total).map(toPageItem),
    ];
  }

  return [
    toPageItem(0),
    { type: 'ellipsis', slot: 'left' },
    ...range(leftSibling, rightSibling + 1).map(toPageItem),
    { type: 'ellipsis', slot: 'right' },
    toPageItem(total - 1),
  ];
};

const Pagination = ({
  items,
  itemsPerPage,
  page: rawPage,
  onPageChange,
}: PaginationProps) => {
  const { t } = useTranslation('notice');
  const jumpInputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingSlot, setEditingSlot] = useState<'left' | 'right' | null>(null);
  const [jumpValue, setJumpValue] = useState('');

  const page = Number.isNaN(rawPage) ? 0 : rawPage;
  const pages = Math.ceil(items / itemsPerPage);

  useEffect(() => {
    if (editingSlot === null) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editingSlot]);

  if (pages <= 1) return null;

  const isFirstPage = page === 0;
  const isLastPage = page + 1 === pages;
  const pageItems = getPageItems(page, pages);

  const openJump = (slot: 'left' | 'right') => {
    setEditingSlot(slot);
    setJumpValue(String(page + 1));
  };

  const closeJump = () => {
    setEditingSlot(null);
    setJumpValue('');
  };

  const submitJump = () => {
    const parsed = Number.parseInt(jumpValue, 10);
    if (Number.isNaN(parsed)) {
      closeJump();
      return;
    }

    const nextPage = clamp(parsed, 1, pages) - 1;
    if (nextPage !== page) onPageChange(nextPage);
    closeJump();
  };

  return (
    <nav
      aria-label={t('list.pagination.label')}
      className="flex w-full flex-wrap items-center justify-center gap-1"
    >
      <Button
        animated
        disabled={isFirstPage}
        className="enabled:hover:bg-muted flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium"
        onClick={() => onPageChange(page - 1)}
      >
        <CaretLeftIcon className="size-4" weight="bold" />
        {t('list.pagination.prev')}
      </Button>

      <div className="flex items-center gap-0.5">
        {pageItems.map((item) => {
          if (item.type === 'ellipsis') {
            if (editingSlot === item.slot) {
              return (
                <input
                  key={item.slot}
                  ref={inputRef}
                  id={jumpInputId}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label={t('list.pagination.jump')}
                  value={jumpValue}
                  className={cn(
                    'border-border bg-background text-foreground',
                    'h-9 w-11 rounded-md border text-center text-sm font-medium tabular-nums',
                    'focus-visible:outline-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                  )}
                  onChange={(event) => {
                    setJumpValue(event.target.value.replace(/\D/g, ''));
                  }}
                  onBlur={closeJump}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      submitJump();
                    }
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      closeJump();
                    }
                  }}
                />
              );
            }

            return (
              <Button
                key={item.slot}
                animated
                aria-label={t('list.pagination.jump')}
                className="text-muted-foreground enabled:hover:bg-muted enabled:hover:text-foreground flex size-9 items-center justify-center rounded-md text-sm"
                onClick={() => openJump(item.slot)}
              >
                …
              </Button>
            );
          }

          return (
            <Button
              key={item.page}
              animated
              aria-label={t('list.pagination.page', { page: item.page + 1 })}
              aria-current={item.page === page ? 'page' : undefined}
              className={cn(
                'enabled:hover:bg-muted flex size-9 items-center justify-center rounded-md text-sm font-medium tabular-nums',
                item.page === page && 'border-border border',
              )}
              onClick={() => onPageChange(item.page)}
            >
              {item.page + 1}
            </Button>
          );
        })}
      </div>

      <Button
        animated
        disabled={isLastPage}
        className="enabled:hover:bg-muted flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium"
        onClick={() => onPageChange(page + 1)}
      >
        {t('list.pagination.next')}
        <CaretRightIcon className="size-4" weight="bold" />
      </Button>
    </nav>
  );
};

export default Pagination;
