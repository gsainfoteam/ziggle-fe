import React from 'react';

import { NoticeSearchParams } from '@/api/notice/notice';
import { getAllNotices } from '@/api/notice/notice-server';
import Pagination from '@/app/components/molecules/Pagination';
import Zabo from '@/app/components/shared/Zabo';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import SearchNoResult from '@/assets/search-no-result.svg';

interface CategorizedNoticesProps {
  sortByDeadline: boolean;
  noticeSearchParams?: NoticeSearchParams;
  page: number;
}

const ITEMS_PER_PAGE = 30;

const CategorizedNotices = async ({
  sortByDeadline,
  noticeSearchParams,
  lng,
  page,
}: PropsWithLng<CategorizedNoticesProps>) => {
  const { t } = await createTranslation(lng);

  const notices = await getAllNotices({
    ...noticeSearchParams,
    offset: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
    lang: lng,
    ...(sortByDeadline ? { orderBy: 'deadline' } : {}),
  });

  return (
    <>
      {notices.list.length ? (
        <>
          <div className="flex w-full flex-col md:max-w-[800px]">
            {...notices.list.map((notice) => (
              <React.Fragment key={notice.id}>
                <Zabo key={notice.id} {...notice} lng={lng} />
                <div className="my-[30px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
              </React.Fragment>
            ))}
          </div>
          <Pagination
            page={page}
            items={notices.total}
            itemsPerPage={ITEMS_PER_PAGE}
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
