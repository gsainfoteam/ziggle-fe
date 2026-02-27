import { useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import SearchNoResult from '@/assets/icons/search-no-result.svg?react';
import { LoadingCatAnimation, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import { useNotices } from '../../viewmodels';
import Pagination from '../components/pagination';
import { SearchAnimation } from '../components/search-animation';
import ResultZabo from '../components/zabo/result-zabo';

const ITEMS_PER_CALL = 10;

const List = ({
  search,
  tags,
  pageNumber,
}: {
  search: string;
  tags: string[];
  pageNumber: number;
}) => {
  const { t } = useTranslation('notice');
  const { data: notices, isLoading } = useNotices({
    limit: ITEMS_PER_CALL,
    search,
    tags,
    page: pageNumber,
    orderBy: 'recent',
  });

  if (isLoading) return <LoadingCatAnimation />;
  if (!notices.list.length) {
    return (
      <div className="flex w-full justify-center">
        <div className="align-center flex flex-col justify-center">
          <div className="h-[100px]" />
          <div style={{ height: '10px', margin: '0 auto' }}></div>

          <SearchNoResult />

          <p className="font-lg md:font-2xl text-secondaryText pt-5 text-center font-bold">
            {t('searchPage.noResult')}
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col flex-nowrap gap-[10px]">
        <div className="h-8" />
        {notices.list.map((notice) => (
          <LogClick
            eventName={LogEvents.noticeClick}
            properties={{
              type: 'searchResult',
              id: notice.id,
            }}
            key={notice.id}
          >
            <ResultZabo {...notice} searchQuery={search} />
          </LogClick>
        ))}
      </div>
      <div className="h-4" />
      <div className="flex justify-center">
        <Pagination
          items={notices.total}
          itemsPerPage={ITEMS_PER_CALL}
          page={pageNumber}
        />
      </div>
    </>
  );
};

export const SearchFrame = () => {
  const {
    query: search,
    tags: rawTags,
    page,
  } = useSearch({
    from: '/_layout/search',
  });
  const tags = rawTags?.split(',').filter(Boolean) ?? [];
  const { t } = useTranslation('notice');

  return (
    <main className="flex w-full flex-col gap-16 px-4">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col md:max-w-[800px]">
          {search ? (
            <List search={search} pageNumber={page} tags={tags} />
          ) : (
            <div className="flex w-full justify-center">
              <div className="flex flex-col items-center">
                <SearchAnimation />
                <div className="h-[10px]" />
                <p className="text-secondaryText mt-[-30px] pt-5 text-lg font-medium md:text-2xl">
                  {t('searchPage.prompt')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
