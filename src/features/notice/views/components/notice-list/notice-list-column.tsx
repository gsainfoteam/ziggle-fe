import { Link, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LoadingCatAnimation, LogClick, Toggle } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { cn } from '@/common/utils';

import type { Category } from '../../../models';
import { useNotices } from '../../../viewmodels';
import { Column } from '../layout/column';
import type { NoticeNavItem } from '../layout/use-notice-nav';
import { NoticeCard } from './notice-card';
import Pagination from './pagination';

function List({
  page,
  orderBy,
  my,
  category,
  sortByDeadline,
}: {
  page: number;
  orderBy: 'recent' | 'deadline' | 'hot';
  my?: 'own' | 'reminders';
  category?: Category;
  sortByDeadline: boolean;
}) {
  const {
    data: notices,
    isLoading,
    isNotFound,
  } = useNotices({
    page,
    orderBy: sortByDeadline ? 'deadline' : orderBy,
    my,
    category,
  });
  const { t } = useTranslation('notice');

  if (isLoading) return <LoadingCatAnimation />;

  if (isNotFound || !notices?.list.length) {
    return (
      <div className="flex w-full justify-center">
        <div className="align-center flex flex-col justify-center">
          <div className="h-25" />
          <div className="mx-auto h-2.5" />
          <SearchNoResult />
          <p className="font-lg md:font-2xl text-secondaryText pt-5 text-center font-bold">
            {t('list.empty')}
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full flex-col gap-5">
        {notices.list.map((notice) => (
          <LogClick
            key={notice.id}
            eventName={LogEvents.noticeClick}
            properties={{ type: 'noticeCard', id: notice.id }}
          >
            <NoticeCard notice={notice} />
          </LogClick>
        ))}
      </div>
      <Pagination
        page={page}
        items={notices.total}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}

export function NoticeListColumn({ item }: { item: NoticeNavItem }) {
  const { t } = useTranslation('notice');
  const search = useSearch({ strict: false });
  const deadline = search.deadline ?? false;
  const page = search.page ?? 0;

  // 카테고리·개인피드(내 공지/리마인드)만 마감순 토글 노출
  const showDeadlineToggle = item.apiCategory != null || item.my != null;

  return (
    <Column
      title={item.title}
      titleIcon={item.ActiveIcon}
      headerRight={
        showDeadlineToggle && (
          <LogClick
            eventName={LogEvents.categoryToggleDeadline}
            properties={{ sortByDeadline: deadline }}
          >
            <Link
              to="."
              search={{ deadline: !deadline, page: 0 }}
              className="flex shrink-0 items-center gap-2 rounded-full"
            >
              <Toggle
                isSwitched={deadline}
                onSwitch={(e) => {
                  const target = e.currentTarget;
                  setTimeout(() => (target.checked = !deadline), 0);
                }}
              />
              <p
                className={cn(
                  'text-sm font-medium',
                  deadline ? 'text-primary' : 'text-greyDark',
                )}
              >
                {t('list.sort_by_deadline')}
              </p>
            </Link>
          </LogClick>
        )
      }
    >
      <div className="flex w-full flex-col items-center gap-5">
        <List
          page={page}
          orderBy={item.orderBy}
          my={item.my}
          category={item.apiCategory}
          sortByDeadline={deadline}
        />
      </div>
    </Column>
  );
}
