import { AnimatePresence, Reorder, useDragControls } from 'framer-motion';

import { useIsDesktop } from '@/common/utils';

import {
  type PanelConfig,
  SEARCH_PANEL_KEY,
  useDeck,
} from '../../../../viewmodels';
import { Panel } from '../../notice-list/panel';
import { SearchPanel } from '../../notice-list/search-panel';
import { type PanelSize } from '../panel-shell';
import { AddPanelButton } from './add-panel-button';

function panelSizeForCount(count: number): PanelSize {
  if (count <= 1) return 'wide';
  if (count === 2) return 'default';
  return 'compact';
}

function DeckPanelContent({
  panel,
  size,
  dragControls,
}: {
  panel: PanelConfig;
  size?: PanelSize;
  dragControls?: ReturnType<typeof useDragControls>;
}) {
  return panel.key === SEARCH_PANEL_KEY ? (
    <SearchPanel inDeck dragControls={dragControls} size={size} />
  ) : (
    <Panel panel={panel} dragControls={dragControls} size={size} />
  );
}

function DeckItem({ panel, size }: { panel: PanelConfig; size?: PanelSize }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      as="div"
      value={panel}
      layout
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative isolate shrink-0"
    >
      <DeckPanelContent panel={panel} dragControls={controls} size={size} />
    </Reorder.Item>
  );
}

export function Deck() {
  const panels = useDeck((s) => s.panels);
  const setPanels = useDeck((s) => s.setPanels);
  const isDesktop = useIsDesktop();
  const size = panelSizeForCount(panels.length);

  if (!isDesktop) {
    const first = panels[0];
    if (!first) return null;
    return (
      <div className="w-full">
        <DeckPanelContent panel={first} />
      </div>
    );
  }

  return (
    <div className="flex gap-5">
      <Reorder.Group
        as="div"
        axis="x"
        values={panels}
        onReorder={setPanels}
        className="flex gap-5"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {panels.map((panel) => (
            <DeckItem key={panel.key} panel={panel} size={size} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <AddPanelButton />
    </div>
  );
}
