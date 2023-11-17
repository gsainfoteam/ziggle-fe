<<<<<<< HEAD
'use client';

import Image from 'next/image';
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
=======
import { Suspense } from 'react';

import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import SearchAnimation from '@/app/components/templates/SearchAnimation';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import Result from './Result';
import SearchBar from './SearchBar';
import SearchTagSelect from './SearchTagSelect';

const ITEMS_PER_CALL = 10;

const SearchPage = async ({
>>>>>>> origin/118-feature-migration-to-nextjs-search-page
  searchParams,
  params: { lng },
}: {
  params: { lng: Locale };
<<<<<<< HEAD
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
=======
  searchParams: { query: string; tags: string };
}) => {
  const { query: search, tags: rawTags } = searchParams;
  const tags = rawTags?.split(',').filter(Boolean) ?? [];

  const { t } = await createTranslation(lng, 'translation');
>>>>>>> origin/118-feature-migration-to-nextjs-search-page

  return (
    <div className="content mx-auto">
      <div className="flex flex-col align-center">
<<<<<<< HEAD
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
              <Image src={SearchGif} alt="search" className={'w-[200px]'} />

              <div className={'h-[100px]'} />
              <div className={'h-[10px]'} />
              <p
                className={
                  'text-lg md:text-2xl text-secondaryText font-medium pt-5 mt-[-30px]'
                }
              >
=======
        <div className="flex justify-center">
          <div className="animate-none search-bar-animation flex flex-col gap-3 mt-20 mb-10">
            <SearchBar />
            <SearchTagSelect />
          </div>
        </div>
        {search ? (
          <Suspense
            key={[search, tags.join(',')].join(',')}
            fallback={<LoadingCatAnimation />}
          >
            <Result
              lng={lng}
              search={search}
              limit={ITEMS_PER_CALL}
              offset={0}
              tags={tags}
            />
          </Suspense>
        ) : (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center">
              <SearchAnimation />
              <div className="h-[10px]" />
              <p className="text-lg md:text-2xl text-secondaryText font-medium pt-5 mt-[-30px]">
>>>>>>> origin/118-feature-migration-to-nextjs-search-page
                {t('searchPage.prompt')}
              </p>
            </div>
          </div>
        )}
<<<<<<< HEAD
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
=======
>>>>>>> origin/118-feature-migration-to-nextjs-search-page
      </div>
    </div>
  );
};

export default SearchPage;
