import React from 'react';

import { Link, useParams, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LogClick, LoadingCatAnimation, Toggle } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { cn } from '@/common/utils';

import { Category } from '../../models';
import { useNotices } from '../../viewmodels';
import { HomeBannerCarousel } from '../components/home-banner-carousel';
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
  category: Category | string;
}) {
  const { data: notices, isLoading } = useNotices({
    page,
    orderBy: sortByDeadline ? 'deadline' : noticeSearchParams?.orderBy,
    my: noticeSearchParams?.my,
    category: category in Category ? (category as Category) : undefined,
  });
  const { t } = useTranslation('notice');

  if (isLoading) return <LoadingCatAnimation />;
  if (!notices?.list.length) {
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
    .find(({ path }) => path === category)!;
  const { noticeSearchParams, icons, title } = currentSidebarObject;

  return (
    <main className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center">
        {category === 'home' && (
          <div className="mt-6 mb-[30px] flex w-full justify-center">
            <HomeBannerCarousel />
          </div>
        )}
        {category !== 'home' && (
          <div className="flex w-full flex-row flex-wrap justify-between gap-[14px] px-[18px] py-5 font-bold md:max-w-[800px]">
            <div className="text-primary flex items-center gap-2 text-4xl">
              <icons.bold className="fill-primary dark:stroke-dark_dark w-10 stroke-white" />
              {title}
            </div>
            {category !== 'deadline' && category !== 'zigglepick' && (
              <LogClick
                eventName={LogEvents.categoryToggleDeadline}
                properties={{
                  category,
                  sortByDeadline: deadline,
                }}
              >
                <Link
                  to="."
                  params={{ category }}
                  search={{ deadline: !deadline, page: 0 }}
                  className="flex items-center gap-3 rounded-full"
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
                      'text-lg font-medium',
                      deadline ? 'text-primary' : 'text-greyDark',
                    )}
                  >
                    {t('common.sortByDeadline')}
                  </p>
                </Link>
              </LogClick>
            )}
          </div>
        )}
        <List
          sortByDeadline={deadline}
          noticeSearchParams={noticeSearchParams}
          page={page}
          category={category}
        />
      </div>
    </main>
  );
}
