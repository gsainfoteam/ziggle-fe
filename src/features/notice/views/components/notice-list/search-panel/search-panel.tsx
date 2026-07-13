import { useState, type ReactNode } from 'react';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { DragControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SEARCH_PANEL_KEY } from '../../../../viewmodels';
import { PanelRemoveButton } from '../../layout/deck/remove-button';
import { PanelShell, type PanelSize } from '../../layout/panel-shell';
import { SearchAnimation } from '../search-animation';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function SearchPanel({
  inDeck,
  size,
  dragControls,
}: {
  inDeck?: boolean;
  size?: PanelSize;
  dragControls?: DragControls;
}) {
  const { t } = useTranslation('notice');
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const [localQuery, setLocalQuery] = useState('');
  const [localPage, setLocalPage] = useState(0);

  const query = inDeck
    ? localQuery
    : ((search.query as string | undefined) ?? '');
  const tags = inDeck
    ? []
    : ((search.tags as string | undefined)?.split(',').filter(Boolean) ?? []);
  const page = inDeck ? localPage : ((search.page as number | undefined) ?? 0);

  const onSubmitQuery = (q: string) => {
    if (inDeck) {
      setLocalQuery(q);
      setLocalPage(0);
      return;
    }
    navigate({
      to: '/search',
      search: (prev) => ({ ...prev, query: q || undefined, page: 0 }),
    });
  };

  const onPageChange = (p: number) => {
    if (inDeck) {
      setLocalPage(p);
      return;
    }
    navigate({ to: '/search', search: (prev) => ({ ...prev, page: p }) });
  };

  const actions: ReactNode = inDeck ? (
    <PanelRemoveButton panelKey={SEARCH_PANEL_KEY} />
  ) : undefined;

  return (
    <PanelShell
      title={t('sidebar.search')}
      titleIcon={<MagnifyingGlassIcon weight="bold" />}
      hideTitleOnMobile
      size={size}
      onHeaderPointerDown={
        dragControls ? (e) => dragControls.start(e) : undefined
      }
      headerRight={actions}
      className="p-0"
    >
      <div className="flex w-full min-w-0 flex-col">
        <div className="dark:bg-dark_dark sticky top-0 z-10 bg-white px-5 md:pt-5">
          <SearchInput value={query} onSubmit={onSubmitQuery} />
        </div>
        <div className="px-5 py-4 md:p-5">
          {query ? (
            <SearchResults
              search={query}
              tags={tags}
              page={page}
              onPageChange={onPageChange}
            />
          ) : (
            <div className="flex w-full justify-center">
              <div className="flex flex-col items-center">
                <SearchAnimation />
                <div className="h-2.5" />
                <p className="text-secondaryText -mt-7.5 pt-5 text-lg font-medium md:text-2xl">
                  {t('search.prompt')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PanelShell>
  );
}
