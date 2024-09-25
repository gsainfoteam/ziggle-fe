import SearchAnimation from '@/app/components/shared/SearchAnimation';
import SearchResults from '@/app/components/shared/SearchResults';
import { createTranslation, PropsWithLng } from '@/app/i18next';

const ITEMS_PER_CALL = 10;

const SearchPage = async ({
  searchParams,
  params: { lng },
}: {
  params: PropsWithLng;
  searchParams: { query: string; tags: string; page: string };
}) => {
  const { query: search, tags: rawTags } = searchParams;
  const tags = rawTags?.split(',').filter(Boolean) ?? [];

  const { t } = await createTranslation(lng);

  return (
    <main className="flex w-full flex-col gap-16 px-4 ">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col md:max-w-[800px]">
          {search ? (
            <SearchResults
              logName="SearchPage"
              lng={lng}
              search={search}
              limit={ITEMS_PER_CALL}
              page={searchParams.page}
              tags={tags}
              orderBy="recent"
            />
          ) : (
            <div className="flex w-full justify-center">
              <div className="flex flex-col items-center">
                <SearchAnimation />
                <div className="h-[10px]" />
                <p className="mt-[-30px] pt-5 text-lg font-medium text-secondaryText md:text-2xl">
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

export default SearchPage;
