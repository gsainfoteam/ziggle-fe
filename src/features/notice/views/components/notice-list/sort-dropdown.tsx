import { CaretDownIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Popover } from '@/common/components';
import { cn } from '@/common/utils';

import type { OrderBy } from '../../../viewmodels';

const OPTIONS: OrderBy[] = ['recent', 'deadline', 'hot'];

export function SortDropdown({
  value,
  onChange,
}: {
  value: OrderBy;
  onChange: (orderBy: OrderBy) => void;
}) {
  const { t } = useTranslation('notice');

  return (
    <Popover.Menu>
      <Popover.Trigger>
        {(open) => (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
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
        )}
      </Popover.Trigger>
      <Popover.Content placement="bottom-end">
        {({ close }) => (
          <Popover.Body className="flex w-32 flex-col gap-y-0.5 rounded-xl p-1.5">
            {OPTIONS.map((option) => {
              const selected = value === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    close();
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
          </Popover.Body>
        )}
      </Popover.Content>
    </Popover.Menu>
  );
}
