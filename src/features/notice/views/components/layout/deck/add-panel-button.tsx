import { CheckIcon, PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Popover } from '@/common/components';
import { cn } from '@/common/utils';

import { SEARCH_PANEL_KEY, useDeck } from '../../../../viewmodels';
import { useNoticeNav } from '../use-notice-nav';

export function AddPanelButton() {
  const { t } = useTranslation('notice');
  const nav = useNoticeNav();
  const { panels, pin } = useDeck(
    useShallow((s) => ({ panels: s.panels, pin: s.pin })),
  );

  const panelKeys = new Set(panels.map((c) => c.key));
  const options = [
    { key: SEARCH_PANEL_KEY, title: nav.search.title, icon: nav.search.Icon },
    ...Object.values(nav.categories).map((c) => ({
      key: c.key,
      title: c.title,
      icon: c.Icon,
    })),
  ];

  return (
    <div className="flex w-14 shrink-0 flex-col md:h-[calc(100vh-3.25rem)]">
      <div className="flex shrink-0 items-center px-2 pb-3" aria-hidden>
        <span className="text-2xl font-bold opacity-0 select-none">+</span>
      </div>
      <Popover.Menu>
        <Popover.Trigger>
          {(open) => (
            <button
              type="button"
              aria-label={t('deck.add_column')}
              className={cn(
                'text-greyDark hover:text-primary hover:border-primary flex w-full flex-1 cursor-pointer items-center justify-center rounded-2xl border border-dashed transition',
                open
                  ? 'border-primary text-primary'
                  : 'border-greyBorder dark:border-dark_greyBorder',
              )}
            >
              <PlusIcon className="size-6" weight="bold" />
            </button>
          )}
        </Popover.Trigger>
        <Popover.Content placement="left">
          {({ close }) => (
            <Popover.Body className="flex w-56 flex-col gap-y-0.5 rounded-xl p-1.5">
              <p className="text-greyDark px-2.5 pt-1 pb-1 text-xs font-semibold">
                {t('deck.add_column')}
              </p>
              {options.map((option) => {
                const added = panelKeys.has(option.key);
                return (
                  <button
                    key={option.key}
                    type="button"
                    disabled={added}
                    onClick={() => {
                      pin(option.key);
                      close();
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-2.5 py-1.5 text-left',
                      added
                        ? 'text-greyDark cursor-default'
                        : 'text-text dark:text-dark_white dark:hover:bg-dark_greyDark cursor-pointer hover:bg-gray-100',
                    )}
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-5">
                      {option.icon}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {option.title}
                    </span>
                    {added && (
                      <CheckIcon className="text-primary size-4 shrink-0" />
                    )}
                  </button>
                );
              })}
            </Popover.Body>
          )}
        </Popover.Content>
      </Popover.Menu>
    </div>
  );
}
