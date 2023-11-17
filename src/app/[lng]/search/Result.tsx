import { getAllNotices } from '@/api/notice/notice';
import ResultZabo from '@/app/components/templates/ResultZabo/ResultZabo';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import SearchNoResult from './assets/searchNoResult.svg';

const Result = async ({
  lng,
  ...props
}: {
  lng: Locale;
  search: string;
  tags: string[];
  offset: number;
  limit: number;
}) => {
  const { t } = await createTranslation(lng, 'translation');
  const data = await getAllNotices(props);
  return (
    <>
      {data?.list.length !== 0 && (
        <div className="gap-[10px] flex flex-col flex-nowrap">
          <p className="text-lg md:text-4xl font-bold">
            {t('searchPage.title')}
          </p>

          <div className="h-8" />

          {data.list.map((notice) => (
            <ResultZabo
              {...notice}
              searchQuery={props.search}
              logName="SearchPage"
              key={notice.id}
            />
          ))}
        </div>
      )}

      {props.search && data.list.length === 0 && (
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
    </>
  );
};

export default Result;
