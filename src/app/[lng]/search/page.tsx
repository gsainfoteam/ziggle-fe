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
  searchParams,
  params: { lng },
}: {
  params: { lng: Locale };
  searchParams: { query: string; tags: string };
}) => {
  const { query: search, tags: rawTags } = searchParams;
  const tags = rawTags?.split(',').filter(Boolean) ?? [];

  const { t } = await createTranslation(lng, 'translation');

  return (
    <div className="content mx-auto">
      <div className="flex flex-col align-center">
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
                {t('searchPage.prompt')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
