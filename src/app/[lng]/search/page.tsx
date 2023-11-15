'use client';

import { useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { NoticeKind } from '@/api/notice/notice';
import SearchBar from '@/app/components/molecules/searchBar/SearchBar';
import SearchTagSelect from '@/app/components/molecules/searchTagSelect/SearchTagSelect';
import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import ResultZabo from '@/app/components/templates/ResultZabo/ResultZabo';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import { useGetAllNotices } from '@/hooks/getAllNotices';

import SearchGif from './assets/search.gif';
import SearchNoResult from './assets/searchNoResult.svg';

const SearchPage = ({
  searchParams,
  params: { lng },
}: {
  params: { lng: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = useState<NoticeKind[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO : submit 동작

    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;
    setSearchKeyword(searchQuery.value); // SearchBar 수정할 때 주의
    sendLog(LogEvents.searchPageSubmit, {
      query: searchQuery.value,
    });
  };

  const data = useGetAllNotices({
    search: searchKeyword,
    tags: selectedTags,
    orderBy: 'recent',
  });

  const handleTagChange = (selected: NoticeKind[]) => {
    setSelectedTags(selected);
    sendLog(LogEvents.searchPageTypeChange, {
      types: selected,
    });
  };

  return (
    <div className="content mx-auto">
      <div className="flex flex-col align-center">
        <div className={'flex justify-center'}>
          <div
            className={
              'animate-none search-bar-animation flex flex-col gap-3 mt-20 mb-10'
            }
          >
            <SearchBar
              onSubmit={handleSubmit}
              placeholder={t('searchPage.searchBar.placeholder')}
            />
            <SearchTagSelect
              selected={selectedTags}
              onChange={handleTagChange}
            />
          </div>
        </div>
        {data && data.list.length > 0 && (
          <div className={'gap-[10px] flex flex-col flex-nowrap'}>
            <p className={'text-lg md:text-4xl font-bold'}>
              {t('searchPage.title')}
            </p>

            <div className={'h-8'} />

            {data.list.map((notice) => (
              <ResultZabo
                {...notice}
                searchQuery={searchKeyword}
                logName={'SearchPage'}
                t={t}
                key={notice.id}
              />
            ))}
          </div>
        )}
        {/* 검색어를 입력하지 않았을 때만 */}
        {!data && !searchKeyword && (
          <div className={'flex justify-center w-full'}>
            <div className={'flex flex-col items-center'}>
              <img src={SearchGif} alt="search" className={'w-[200px]'} />

              <div className={'h-[100px]'} />
              <div className={'h-[10px]'} />
              <p
                className={
                  'text-lg md:text-2xl text-secondaryText font-medium pt-5 mt-[-30px]'
                }
              >
                {t('searchPage.prompt')}
              </p>
            </div>
          </div>
        )}
        {/* 검색어를 입력했을 때 로딩 */}
        {!data && searchKeyword && <LoadingCatAnimation />}

        {data && data.list.length === 0 && (
          <div className={'flex justify-center w-full'}>
            <div className={'flex justify-center flex-col align-center'}>
              <div className={'h-[100px]'} />
              <div style={{ height: '10px', margin: '0 auto' }}></div>

              <SearchNoResult />

              <p
                className={
                  'text-center text-secondaryText font-bold font-lg md:font-2xl pt-5'
                }
              >
                {t('searchPage.noResult')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
