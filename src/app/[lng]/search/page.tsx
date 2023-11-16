import Image from 'next/image';

import { getAllNotices } from '@/api/notice/notice';
import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import ResultZabo from '@/app/components/templates/ResultZabo/ResultZabo';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import SearchGif from './assets/search.gif';
import SearchNoResult from './assets/searchNoResult.svg';
import SearchBar from './SearchBar';
import SearchTagSelect from './SearchTagSelect';

const ITEMS_PER_CALL = 10;

const SearchPage = async ({
  searchParams,
  params: { lng },
}: {
  params: { lng: Locale };
  searchParams: { query: string; tags: string };
}) => {
  const { query: search, tags: rawTags } = searchParams;
  const tags = rawTags?.split(',').filter(Boolean) ?? [];

  const { t } = await createTranslation(lng, 'translation');
  const data = await getAllNotices({
    search,
    tags,
    offset: 0,
    limit: ITEMS_PER_CALL,
  });

  return (
    <div className="content mx-auto">
      <div className="flex flex-col align-center">
        <div className="flex justify-center">
          <div className="animate-none search-bar-animation flex flex-col gap-3 mt-20 mb-10">
            <SearchBar />
            <SearchTagSelect />
          </div>
        </div>
        {data?.list.length !== 0 && (
          <div className="gap-[10px] flex flex-col flex-nowrap">
            <p className="text-lg md:text-4xl font-bold">
              {t('searchPage.title')}
            </p>

            <div className="h-8" />

            {data.list.map((notice) => (
              <ResultZabo
                {...notice}
                searchQuery={search}
                logName="SearchPage"
                t={t}
                key={notice.id}
              />
            ))}
          </div>
        )}
        {/* 검색어를 입력하지 않았을 때만 */}
        {!search && (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center">
              <Image src={SearchGif} alt="search" className="w-[200px]" />

              <div className="h-[100px]" />
              <div className="h-[10px]" />
              <p className="text-lg md:text-2xl text-secondaryText font-medium pt-5 mt-[-30px]">
                {t('searchPage.prompt')}
              </p>
            </div>
          </div>
        )}
        {/* 검색어를 입력했을 때 로딩 */}
        {search && <LoadingCatAnimation />}

        {search && data.list.length === 0 && (
          <div className="flex justify-center w-full">
            <div className="flex justify-center flex-col align-center">
              <div className="h-[100px]" />
              <div style={{ height: '10px', margin: '0 auto' }}></div>

              <SearchNoResult />

              <p className="text-center text-secondaryText font-bold font-lg md:font-2xl pt-5">
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
