import React from 'react';

import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { LandingModal } from '@/features/landing';

import { Column } from '../components/layout/column';
import { NoticeShell } from '../components/layout/notice-shell';
import { useNoticeNav } from '../components/layout/use-notice-nav';
import { NoticeCardSkeleton } from '../components/notice-list/notice-card';
import Pagination from '../components/notice-list/pagination';

function NoticeListSkeleton() {
  const recent = useNoticeNav().feeds.recent;
  return (
    <Column title={recent.title} titleIcon={recent.ActiveIcon}>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col">
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                <NoticeCardSkeleton />
                <div className="bg-greyLight dark:bg-dark_greyBorder my-7.5 h-px" />
              </React.Fragment>
            ))}
          </div>
        </div>
        <Pagination page={20} items={2000} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </Column>
  );
}

export function NoticeSkeletonLayout() {
  return (
    <>
      <LandingModal />
      <NoticeShell>
        <NoticeListSkeleton />
      </NoticeShell>
    </>
  );
}
