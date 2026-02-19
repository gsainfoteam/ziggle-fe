import React from 'react';

import HomeBannerCarousel from '@/app/components/shared/HomeBannerCarousel';
import LogEvents from '@/api/log/log-events';
import { NoticeSearchParams } from '@/api/notice/notice';
import { getAllNotices } from '@/api/notice/notice-server';
import Analytics from '@/app/components/shared/Analytics';
import Pagination from '@/app/components/shared/Pagination';
import Zabo from '@/app/components/shared/Zabo';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import SearchNoResult from '@/assets/icons/search-no-result.svg';

interface CategorizedNoticesProps {
  sortByDeadline: boolean;
  noticeSearchParams?: NoticeSearchParams;
  page: number;
  itemsPerPage?: number;
  category?: string;
}

const CategorizedNotices = async ({
  sortByDeadline,
  noticeSearchParams,
  itemsPerPage = 30,
  lng,
  page,
  category,
}: PropsWithLng<CategorizedNoticesProps>) => {
  const { t } = await createTranslation(lng);

  const notices = await getAllNotices({
    ...noticeSearchParams,
    offset: page * itemsPerPage,
    limit: itemsPerPage,
    lang: lng,
    ...(sortByDeadline ? { orderBy: 'deadline' } : {}),
  });

  return (
    <>
      {category === 'home' && (
        <div className="w-full mb-6 flex justify-center">
          <HomeBannerCarousel />
        </div>
      )}
      {notices.list.length ? (
        <>
          <div className="flex w-full flex-col md:max-w-[800px]">
            {...notices.list.map((notice) => (
              <React.Fragment key={notice.id}>
                <Analytics
                  event={LogEvents.noticeClick}
                  properties={{
                    type: 'zabo',
                    id: notice.id,
                    searchParams: noticeSearchParams,
                  }}
                >
                  <Zabo key={notice.id} {...notice} lng={lng} />
                </Analytics>
                <div className="my-[30px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
              </React.Fragment>
            ))}
          </div>
          <Pagination
            page={page}
            items={notices.total}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <div className="flex w-full justify-center">
          <div className="align-center flex flex-col justify-center">
            <div className="h-[100px]" />
            <div className="mx-auto h-[10px]" />

            <SearchNoResult />

            <p className="font-lg md:font-2xl pt-5 text-center font-bold text-secondaryText">
              {t('emptyNotices')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorizedNotices;
