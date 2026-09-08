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

import { cn, useEdgeFade } from '@/common/utils';
import { type Category, type OrderBy } from '@/features/notice/viewmodels';

import { SortDropdown } from '../../notice-list/sort-dropdown';
import { useNoticeNav } from '../use-notice-nav';

const SCROLL_STEP = 120;

export function CategoryChips({ className }: { className?: string }) {
  const { t } = useTranslation('notice');
  const nav = useNoticeNav();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const params = useParams({ strict: false }) as { category?: string };
  const activeCategory = params.category?.toUpperCase() as Category | undefined;
  const orderBy = (search.orderBy as OrderBy | undefined) ?? 'recent';
  const { edges, elementRef, scrollerProps } = useEdgeFade<HTMLDivElement>();

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

  const scrollByDir = (dir: 'left' | 'right') => {
    elementRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'bg-background flex items-center gap-2 px-5 md:hidden',
        className,
      )}
    >
      <div className="relative min-w-0 flex-1">
        <div
          {...scrollerProps}
          className="scrollbar-none flex gap-2 overflow-x-auto"
        >
          {chips.map((chip) => (
            <Link
              key={chip.key}
              to={chip.to}
              params={chip.params}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition',
                chip.isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-muted text-foreground',
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
          tabIndex={edges.start ? 0 : -1}
          aria-label="이전 카테고리"
          disabled={!edges.start}
          onClick={() => scrollByDir('left')}
          className={cn(
            'text-muted-foreground absolute inset-y-0 left-0 z-10 flex w-7 items-center justify-center transition-opacity',
            edges.start ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <CaretLeftIcon className="size-4" weight="bold" />
        </button>
        <button
          type="button"
          tabIndex={edges.end ? 0 : -1}
          aria-label="다음 카테고리"
          disabled={!edges.end}
          onClick={() => scrollByDir('right')}
          className={cn(
            'text-muted-foreground absolute inset-y-0 right-0 z-10 flex w-7 items-center justify-center transition-opacity',
            edges.end ? 'opacity-100' : 'pointer-events-none opacity-0',
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
