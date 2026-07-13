import { useEffect, useRef, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router';

import {
  CaretLeftIcon,
  CaretRightIcon,
  NewspaperIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import { Category, type OrderBy } from '@/features/notice/viewmodels';

import { SortDropdown } from '../../notice-list/sort-dropdown';
import { useNoticeNav } from '../use-notice-nav';

const SCROLL_STEP = 120;
const EDGE_FADE = '2.75rem';

function edgeMask({ left, right }: { left: boolean; right: boolean }) {
  if (!left && !right) return undefined;
  if (left && right) {
    return `linear-gradient(to right, transparent, black ${EDGE_FADE}, black calc(100% - ${EDGE_FADE}), transparent)`;
  }
  if (left) {
    return `linear-gradient(to right, transparent, black ${EDGE_FADE}, black)`;
  }
  return `linear-gradient(to right, black, black calc(100% - ${EDGE_FADE}), transparent)`;
}

export function CategoryChips({ className }: { className?: string }) {
  const { t } = useTranslation('notice');
  const nav = useNoticeNav();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const params = useParams({ strict: false }) as { category?: string };
  const activeCategory = params.category?.toUpperCase() as Category | undefined;
  const orderBy = (search.orderBy as OrderBy | undefined) ?? 'recent';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edgeFade, setEdgeFade] = useState({ left: false, right: false });

  const chips = [
    {
      key: 'all',
      title: t('tabs.all'),
      Icon: <NewspaperIcon />,
      ActiveIcon: <NewspaperIcon weight="fill" />,
      to: '/home' as const,
      params: undefined,
      isActive: !activeCategory,
    },
    ...Object.values(nav.categories).map((item) => ({
      key: item.key,
      title: item.title,
      Icon: item.Icon,
      ActiveIcon: item.ActiveIcon,
      to: '/$category' as const,
      params: { category: item.apiCategory! },
      isActive: activeCategory === item.apiCategory,
    })),
  ];

  const updateEdgeFade = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setEdgeFade({
      left: scrollLeft > 2,
      right: scrollLeft + clientWidth < scrollWidth - 2,
    });
  };

  const scrollByDir = (dir: 'left' | 'right') => {
    scrollerRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateEdgeFade();
    const el = scrollerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateEdgeFade);
    observer.observe(el);
    return () => observer.disconnect();
  }, [chips.length, t]);

  return (
    <div
      className={cn(
        'dark:bg-dark_dark flex items-center gap-2 bg-white px-5 md:hidden',
        className,
      )}
    >
      <div className="relative min-w-0 flex-1">
        <div
          ref={scrollerRef}
          onScroll={updateEdgeFade}
          className="scrollbar-none flex gap-2 overflow-x-auto"
          style={{
            maskImage: edgeMask(edgeFade),
            WebkitMaskImage: edgeMask(edgeFade),
          }}
        >
          {chips.map((chip) => (
            <Link
              key={chip.key}
              to={chip.to}
              params={chip.params}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition',
                chip.isActive
                  ? 'bg-primary text-white'
                  : 'bg-greyLight dark:bg-dark_greyDark text-text dark:text-dark_white',
              )}
            >
              <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-5">
                {chip.isActive ? chip.ActiveIcon : chip.Icon}
              </span>
              <span className="whitespace-nowrap">{chip.title}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          tabIndex={edgeFade.left ? 0 : -1}
          aria-label="이전 카테고리"
          disabled={!edgeFade.left}
          onClick={() => scrollByDir('left')}
          className={cn(
            'text-greyDark dark:text-dark_grey absolute inset-y-0 left-0 z-10 flex w-7 items-center justify-center transition-opacity',
            edgeFade.left ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <CaretLeftIcon className="size-4" weight="bold" />
        </button>
        <button
          type="button"
          tabIndex={edgeFade.right ? 0 : -1}
          aria-label="다음 카테고리"
          disabled={!edgeFade.right}
          onClick={() => scrollByDir('right')}
          className={cn(
            'text-greyDark dark:text-dark_grey absolute inset-y-0 right-0 z-10 flex w-7 items-center justify-center transition-opacity',
            edgeFade.right ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <CaretRightIcon className="size-4" weight="bold" />
        </button>
      </div>

      <div className="shrink-0">
        <SortDropdown
          value={orderBy}
          onChange={(v) => {
            navigate({
              to: '.',
              search: { ...search, orderBy: v, page: 0 },
            });
          }}
        />
      </div>
    </div>
  );
}
