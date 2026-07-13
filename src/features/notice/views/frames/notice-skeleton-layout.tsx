import React from 'react';

import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { LandingModal } from '@/features/landing';

import { NoticeShell } from '../components/layout/notice-shell';
import { PanelShell } from '../components/layout/panel-shell';
import { useNoticeNav } from '../components/layout/use-notice-nav';
import { ListDivider } from '../components/notice-list/list-divider';
import { NoticeCardSkeleton } from '../components/notice-list/notice-card';
import Pagination from '../components/notice-list/pagination';

function NoticeListSkeleton() {
  const recent = useNoticeNav().feeds.recent;
  return (
    <PanelShell
      title={recent.title}
      titleIcon={recent.ActiveIcon}
      hideTitleOnMobile
    >
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col">
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                {index > 0 ? <ListDivider /> : null}
                <NoticeCardSkeleton />
              </React.Fragment>
            ))}
          </div>
        </div>
        <Pagination
          page={20}
          items={2000}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={() => {}}
        />
      </div>
    </PanelShell>
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
