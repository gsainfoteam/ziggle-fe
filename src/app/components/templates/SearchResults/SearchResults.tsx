import { getAllNotices } from '@/api/notice/notice-server';
import Analytics from '@/app/components/atoms/Analytics';
import Pagination from '@/app/components/molecules/Pagination';
import ResultZabo from '@/app/components/templates/ResultZabo/ResultZabo';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import SearchNoResult from '@/assets/search-no-result.svg';

const SearchResults = async ({
  lng,
  logName,
  ...props
}: PropsWithLng<
  {
    logName?: string;
    page: string | number;
    limit: number;
  } & Parameters<typeof getAllNotices>[0]
>) => {
  const { t } = await createTranslation(lng);
  const pageAsNumber = Number.parseInt(props.page as string);

  const data = await getAllNotices({
    ...props,
    offset: pageAsNumber * props.limit,
  }).catch(() => ({ list: [], total: 0 }));

  const pagination = (
    <div className="flex justify-center">
      <Pagination
        pages={Math.ceil(data.total / props.limit)}
        page={pageAsNumber}
      />
    </div>
  );

  return (
    <>
      {pagination}
      {data?.list.length !== 0 && (
        <div className="flex flex-col flex-nowrap gap-[10px]">
          <div className="h-8" />

          {data.list.map((notice) => (
            <Analytics
              event="search_result_click"
              properties={{
                location: 'SearchPage',
                isText: notice.imageUrl === null,
              }}
              key={notice.id}
            >
              <ResultZabo {...notice} searchQuery={props.search} lng={lng} />
            </Analytics>
          ))}
        </div>
      )}

      {props.search && data.list.length === 0 && (
        <div className="flex w-full justify-center">
          <div className="align-center flex flex-col justify-center">
            <div className="h-[100px]" />
            <div style={{ height: '10px', margin: '0 auto' }}></div>

            <SearchNoResult />

            <p className="font-lg md:font-2xl pt-5 text-center font-bold text-secondaryText">
              {t('searchPage.noResult')}
            </p>
          </div>
        </div>
      )}

      <div className="h-8" />
      {pagination}
    </>
  );
};

export default SearchResults;
