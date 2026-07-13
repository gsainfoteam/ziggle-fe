import { useState } from 'react';

import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Drawer, Popover } from '@/common/components';
import { cn, useIsDesktop } from '@/common/utils';

import type { OrderBy } from '../../../viewmodels';

const OPTIONS: OrderBy[] = ['recent', 'deadline', 'hot'];

function SortOptions({
  value,
  onChange,
  onClose,
  className,
  variant = 'menu',
}: {
  value: OrderBy;
  onChange: (orderBy: OrderBy) => void;
  onClose: () => void;
  className?: string;
  variant?: 'menu' | 'sheet';
}) {
  const { t } = useTranslation('notice');

  if (variant === 'sheet') {
    return (
      <div
        className={cn(
          'bg-greyLight dark:bg-dark_greyDark flex flex-col overflow-hidden rounded-2xl',
          className,
        )}
      >
        {OPTIONS.map((option, index) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                onClose();
              }}
              className={cn(
                'flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left text-[15px] transition',
                index > 0 &&
                  'border-greyBorder dark:border-dark_greyBorder border-t',
                selected
                  ? 'text-primary font-semibold'
                  : 'text-text dark:text-dark_white font-medium',
              )}
            >
              <span className="flex-1">{t(`list.sort.${option}`)}</span>
              {selected ? (
                <CheckIcon className="text-primary size-5" weight="bold" />
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-y-0.5', className)}>
      {OPTIONS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
              onClose();
            }}
            className={cn(
              'cursor-pointer rounded-md px-2.5 py-1.5 text-left text-sm transition',
              selected
                ? 'text-primary bg-primary/10 dark:bg-primary/20 font-semibold'
                : 'dark:hover:bg-dark_greyDark hover:bg-gray-100',
            )}
          >
            {t(`list.sort.${option}`)}
          </button>
        );
      })}
    </div>
  );
}

export function SortDropdown({
  value,
  onChange,
}: {
  value: OrderBy;
  onChange: (orderBy: OrderBy) => void;
}) {
  const { t } = useTranslation('notice');
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          setAnchor(e.currentTarget);
          setOpen((v) => !v);
        }}
        className={cn(
          'flex shrink-0 cursor-pointer items-center gap-0.5 rounded-full text-sm font-medium transition',
          open
            ? 'text-primary'
            : 'text-greyDark hover:text-text dark:hover:text-dark_white',
        )}
      >
        {t(`list.sort.${value}`)}
        <CaretDownIcon className="size-3.5" weight="bold" />
      </button>

      {isDesktop ? (
        <Popover.Root
          isOpen={open}
          onClose={close}
          anchor={anchor}
          placement="bottom-end"
        >
          <Popover.Body className="flex w-32 flex-col gap-y-0.5 rounded-xl p-1.5">
            <SortOptions value={value} onChange={onChange} onClose={close} />
          </Popover.Body>
        </Popover.Root>
      ) : (
        <Drawer.Root
          isOpen={open}
          onClose={close}
          side="bottom"
          size="compact"
          className="gap-3 p-4 pt-7"
        >
          <Drawer.Header className="pr-0">
            <Drawer.Title className="text-base font-semibold">
              {t('list.sort.label')}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex-none">
            <SortOptions
              value={value}
              onChange={onChange}
              onClose={close}
              variant="sheet"
            />
          </Drawer.Body>
        </Drawer.Root>
      )}
    </>
  );
}
