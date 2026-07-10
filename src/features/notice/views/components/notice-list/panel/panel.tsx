import { useState } from 'react';

import { useNavigate, useSearch } from '@tanstack/react-router';
import type { DragControls } from 'framer-motion';

import {
  HOME_PANEL_KEY,
  type PanelConfig,
  useDeck,
} from '../../../../viewmodels';
import { PanelRemoveButton } from '../../layout/deck/remove-button';
import { PanelShell, type PanelSize } from '../../layout/panel-shell';
import {
  type NoticeNavItem,
  useNavItemByKey,
} from '../../layout/use-notice-nav';
import { SortDropdown } from '../sort-dropdown';
import { List } from './list';

export function Panel({
  item,
  panel,
  size,
  dragControls,
}: {
  item?: NoticeNavItem;
  panel?: PanelConfig;
  size?: PanelSize;
  dragControls?: DragControls;
}) {
  const resolve = useNavItemByKey();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const setOrderBy = useDeck((s) => s.setOrderBy);
  const [localPage, setLocalPage] = useState(0);

  const isDeck = panel != null;
  const navItem = isDeck ? resolve(panel.key) : item;
  if (!navItem) return null;

  const orderBy = isDeck
    ? (panel.orderBy ?? navItem.orderBy)
    : (search.orderBy ?? navItem.orderBy);
  const page = isDeck ? localPage : (search.page ?? 0);

  return (
    <PanelShell
      title={navItem.title}
      titleIcon={navItem.ActiveIcon}
      size={size}
      onHeaderPointerDown={
        dragControls ? (e) => dragControls.start(e) : undefined
      }
      headerRight={
        <div className="flex shrink-0 items-center gap-2">
          <SortDropdown
            value={orderBy}
            onChange={(v) => {
              if (isDeck) {
                setOrderBy(panel.key, v);
                setLocalPage(0);
              } else {
                navigate({
                  to: '.',
                  search: { ...search, orderBy: v, page: 0 },
                });
              }
            }}
          />
          {isDeck && panel.key !== HOME_PANEL_KEY ? (
            <PanelRemoveButton panelKey={panel.key} />
          ) : null}
        </div>
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <List
          page={page}
          orderBy={orderBy}
          my={navItem.my}
          category={navItem.apiCategory}
          onPageChange={(p) => {
            if (isDeck) setLocalPage(p);
            else navigate({ to: '.', search: { ...search, page: p } });
          }}
        />
      </div>
    </PanelShell>
  );
}
