import React from 'react';

import { Link, useParams, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LogClick, LoadingCatAnimation } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { cn } from '@/common/utils';

import { Category } from '../../models';
import { useNotices } from '../../viewmodels';
import Pagination from '../components/pagination';
import { useSidebarObject } from '../components/sidebar';
import { Zabo } from '../components/zabo';

function List({
  page,
  noticeSearchParams,
  sortByDeadline,
  category,
}: {
  page: number;
  noticeSearchParams?: {
    orderBy?: 'recent' | 'deadline' | 'hot';
    my?: 'own' | 'reminders';
  };
  sortByDeadline: boolean;
  category: Category | 'home' | 'deadline' | 'zigglepick';
}) {
  const { data: notices, isLoading } = useNotices({
    page,
    orderBy: sortByDeadline ? 'deadline' : noticeSearchParams?.orderBy,
    my: noticeSearchParams?.my,
    category: category in Category ? (category as Category) : undefined,
  });
  const { t } = useTranslation('notice');

  if (isLoading) return <LoadingCatAnimation />;
  if (!notices.list.length) {
    return (
      <div className="flex w-full justify-center">
        <div className="align-center flex flex-col justify-center">
          <div className="h-[100px]" />
          <div className="mx-auto h-[10px]" />

          <SearchNoResult />

          <p className="font-lg md:font-2xl text-secondaryText pt-5 text-center font-bold">
            {t('emptyNotices')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col md:max-w-[800px]">
        {...notices.list.map((notice) => (
          <React.Fragment key={notice.id}>
            <LogClick
              eventName={LogEvents.noticeClick}
              properties={{
                type: 'zabo',
                id: notice.id,
                // searchParams: noticeSearchParams,
              }}
            >
              <Zabo key={notice.id} {...notice} />
            </LogClick>
            <div className="bg-greyLight dark:bg-dark_greyBorder my-[30px] h-px" />
          </React.Fragment>
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

export function NoticeListFrame() {
  const sidebarObject = useSidebarObject();
  const { category } = useParams({ from: '/_layout/_sidebar/$category' });
  const { deadline, page } = useSearch({ from: '/_layout/_sidebar/$category' });
  const { t } = useTranslation('notice');

  const currentSidebarObject = sidebarObject
    .flat(2)
    .find(({ path }) => path === category.toLowerCase())!;
  const { noticeSearchParams, icons, title } = currentSidebarObject;
  const sortByDeadline = deadline === 'true';
  const pageNumber = Number.parseInt(page ?? '');

  return (
    <main className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center">
        {category !== 'home' && (
          <div className="flex w-full flex-row flex-wrap justify-between gap-[14px] px-[18px] py-5 font-bold md:max-w-[800px]">
            <div className="text-primary flex items-center gap-2 text-4xl">
              <icons.bold className="fill-primary dark:stroke-dark_dark w-10 stroke-white" />
              {title}
            </div>
            {category !== 'deadline' && category !== 'zigglepick' && (
              <div className="flex items-center gap-3">
                <LogClick
                  eventName={LogEvents.categoryToggleDeadline}
                  properties={{
                    category,
                    sortByDeadline,
                  }}
                >
                  <Link
                    to="."
                    params={{ category }}
                    search={{
                      deadline: sortByDeadline ? 'false' : 'true',
                      page: '0',
                    }}
                    className="flex rounded-full"
                  >
                    <input
                      // TODO: use toggle component
                      // className={styles.checkbox}
                      type="checkbox"
                      checked={sortByDeadline}
                      readOnly
                    />
                  </Link>
                </LogClick>

                <p
                  className={cn(
                    'text-lg font-medium',
                    sortByDeadline ? 'text-primary' : 'text-greyDark',
                  )}
                >
                  {t('common.sortByDeadline')}
                </p>
              </div>
            )}
          </div>
        )}
        <List
          sortByDeadline={sortByDeadline}
          noticeSearchParams={noticeSearchParams}
          page={pageNumber}
          category={category}
        />
      </div>
    </main>
  );
}
