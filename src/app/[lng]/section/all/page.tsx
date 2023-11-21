import { Suspense } from 'react';

import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import SearchResults from '@/app/components/templates/SearchResults';
import { PropsWithLng } from '@/app/i18next';

export const dynamic = 'force-dynamic';

const AllNoticePage = async ({
  searchParams,
  params: { lng },
}: {
  params: PropsWithLng;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page } = searchParams;
  const pageNumber = Number(page) || 0;

  return (
    <Suspense key={pageNumber} fallback={<LoadingCatAnimation lng={lng} />}>
      <SearchResults
        logName="AllPage"
        limit={30}
        lng={lng}
        page={pageNumber}
        search=""
        tags={[]}
      />
    </Suspense>
  );
};

export default AllNoticePage;
