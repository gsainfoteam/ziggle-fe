import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import SearchResults from '@/app/components/templates/SearchResults';
import { PropsWithLng } from '@/app/i18next';

export const dynamic = 'force-dynamic';

const tags = ['event', 'recruit', 'general', 'academic'];
const types = ['all', 'urgent', 'hot', ...tags, 'written', 'reminded'];

const AllNoticePage = async ({
  searchParams,
  params: { lng, type },
}: {
  params: PropsWithLng<{ type: string }>;
  searchParams: { page: string };
}) => {
  if (!types.includes(type)) notFound();
  const { page } = searchParams;
  const pageNumber = Number(page) || 0;

  return (
    <Suspense key={pageNumber} fallback={<LoadingCatAnimation lng={lng} />}>
      <SearchResults
        logName={`${type}-notice`}
        limit={30}
        lng={lng}
        page={pageNumber}
        my={
          type === 'written'
            ? 'own'
            : type === 'reminded'
              ? 'reminders'
              : undefined
        }
        tags={tags.includes(type) ? [type] : undefined}
        orderBy={
          type === 'urgent' ? 'deadline' : type === 'hot' ? 'hot' : undefined
        }
      />
    </Suspense>
  );
};

export default AllNoticePage;
