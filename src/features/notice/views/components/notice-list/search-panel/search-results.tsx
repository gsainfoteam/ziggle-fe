import { Fragment } from 'react';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LoadingCatAnimation, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import { useNotices } from '../../../../viewmodels';
import { ListDivider } from '../list-divider';
import { NoticeCard } from '../notice-card';
import Pagination from '../pagination';

const ITEMS_PER_CALL = 10;

export function SearchResults({
  search,
  tags,
  page,
  onPageChange,
}: {
  search: string;
  tags: string[];
  page: number;
  onPageChange: (page: number) => void;
}) {
  const { t } = useTranslation('notice');
  const {
    data: notices,
    isLoading,
    isNotFound,
  } = useNotices({
    limit: ITEMS_PER_CALL,
    search,
    tags,
    page,
    orderBy: 'recent',
  });

  if (isLoading) return <LoadingCatAnimation />;
  if (isNotFound || !notices?.list.length) {
    return (
      <div className="flex w-full justify-center">
        <div className="align-center flex flex-col justify-center">
          <div className="h-25" />
          <div className="mx-auto h-2.5" />
          <SearchNoResult className="mx-auto w-40 md:w-48" />
          <p className="font-lg md:font-2xl text-subtle pt-5 text-center font-bold">
            {t('search.no_result')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full min-w-0 flex-col">
        {notices.list.map((notice, index) => (
          <Fragment key={notice.id}>
            {index > 0 ? <ListDivider /> : null}
            <LogClick
              eventName={LogEvents.noticeClick}
              properties={{ type: 'searchResult', id: notice.id }}
            >
              <NoticeCard notice={notice} searchQuery={search} />
            </LogClick>
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          items={notices.total}
          itemsPerPage={ITEMS_PER_CALL}
          page={page}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
