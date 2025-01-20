import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';

import { searchGroupWithName } from '@/api/group/search-groups-with-name';
import { getAllNotices } from '@/api/notice/notice-server';
import Analytics from '@/app/components/shared/Analytics';
import LoadingCatAnimation from '@/app/components/shared/LoadingCatAnimation';
import Pagination from '@/app/components/shared/Pagination';
import HighlightedText from '@/app/components/shared/Zabo/HighlightedText';
import ResultZabo from '@/app/components/shared/Zabo/ResultZabo/ResultZabo';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import RightArrowIcon from '@/assets/icons/arrow-right.svg';
import VerifiedBadge from '@/assets/icons/badge-check.svg';
import DefaultProfile from '@/assets/icons/default-profile.svg';
import SearchNoResult from '@/assets/icons/search-no-result.svg';

const Results = async ({
  lng,
  logName,
  page,
  ...props
}: ComponentProps<typeof SearchResults>) => {
  const pageAsNumber = Number.parseInt(page as string);
  const { t } = await createTranslation(lng);
  const notices = await getAllNotices({
    ...props,
    lang: lng,
    offset: pageAsNumber * props.limit,
  }).catch(() => ({ list: [], total: 0 }));

  const groups = props.search
    ? await searchGroupWithName(props.search, lng).catch(() => [])
    : [];

  return (
    <>
      <div className="flex flex-col flex-nowrap gap-[10px]">
        <div className="h-8" />
        {groups.length !== 0 &&
          groups.map(({ uuid, name, verified, profileImageUrl }) => (
            <Link
              key={uuid}
              className="min-w-fit"
              href={`${process.env.NEXT_PUBLIC_GROUPS_API_URL}detail/${uuid}?tab=notice`}
            >
              <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-greyLight p-4 text-text dark:bg-dark_greyDark md:rounded-lg md:p-5">
                <div className="flex items-center justify-between gap-4 md:justify-start">
                  <div className="flex items-center justify-center gap-2">
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        alt={`group ${name} profile image`}
                        className="aspect-square md:h-24 md:w-24"
                      />
                    ) : (
                      <DefaultProfile className="aspect-square h-14 w-14 md:h-24 md:w-24" />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="text-sm font-normal text-greyDark dark:text-dark_greyDark">
                      {t('zabo.group.group')}
                    </div>
                    <div className="flex items-center gap-1 break-words text-2xl font-semibold text-text">
                      <HighlightedText query={props.search ?? ''}>
                        {name}
                      </HighlightedText>
                      {verified && (
                        <>
                          <VerifiedBadge className="peer aspect-square h-6 w-6" />
                          <div className="hidden text-sm font-normal text-greyDark opacity-0 transition-opacity peer-hover:opacity-100 dark:text-dark_greyDark md:flex">
                            {t('zabo.group.verifiedDescription')}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <RightArrowIcon className="w-6 fill-none stroke-grey dark:stroke-dark_grey md:w-9" />
                </div>
              </div>
            </Link>
          ))}
        {notices.list.map((notice) => (
          <Analytics
            event="search_result_click"
            properties={{
              location: 'SearchPage',
              isText: notice.imageUrls.length === 0,
            }}
            key={notice.id}
          >
            <ResultZabo {...notice} searchQuery={props.search} lng={lng} />
          </Analytics>
        ))}
      </div>
      {props.search && notices.list.length === 0 && (
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
    </>
  );
};

const SearchResults = async ({
  lng,
  page,
  ...props
}: PropsWithLng<
  {
    logName?: string;
    page: string | number;
    limit: number;
  } & Parameters<typeof getAllNotices>[0]
>) => {
  const pageAsNumber = Number.parseInt(page as string);

  const data = await getAllNotices({
    ...props,
    lang: lng,
    limit: 0,
  }).catch(() => ({ list: [], total: 0 }));

  const pagination = (
    <div className="flex justify-center">
      <Pagination
        items={data.total}
        itemsPerPage={props.limit}
        page={pageAsNumber}
      />
    </div>
  );

  return (
    <>
      <Suspense
        key={JSON.stringify(page)}
        fallback={<LoadingCatAnimation lng={lng} />}
      >
        <Results lng={lng} page={page} {...props} />
      </Suspense>
      <div className="h-4" />
      {pagination}
    </>
  );
};

export default SearchResults;
