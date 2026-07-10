import { Fragment } from 'react';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LoadingCatAnimation, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { ITEMS_PER_PAGE } from '@/common/const/notice';

import {
  type Category,
  type My,
  type OrderBy,
  useNotices,
} from '../../../../viewmodels';
import { ListDivider } from '../list-divider';
import { NoticeCard } from '../notice-card';
import Pagination from '../pagination';

export function List({
  page,
  orderBy,
  my,
  category,
  onPageChange,
}: {
  page: number;
  orderBy: OrderBy;
  my?: My;
  category?: Category;
  onPageChange: (page: number) => void;
}) {
  const {
    data: notices,
    isLoading,
    isNotFound,
  } = useNotices({ page, orderBy, my, category });
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
      <div className="flex w-full flex-col">
        {notices.list.map((notice, index) => (
          <Fragment key={notice.id}>
            {index > 0 ? <ListDivider /> : null}
            <LogClick
              eventName={LogEvents.noticeClick}
              properties={{ type: 'noticeCard', id: notice.id }}
            >
              <NoticeCard notice={notice} />
            </LogClick>
          </Fragment>
        ))}
      </div>
      <Pagination
        page={page}
        items={notices.total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </>
  );
}
