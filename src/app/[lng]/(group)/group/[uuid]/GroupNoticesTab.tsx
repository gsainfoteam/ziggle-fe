import { Suspense } from 'react';

import CategorizedNotices from '@/app/[lng]/(common)/(needSidebar)/[category]/CategorizedNotices';
import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import { PropsWithLng } from '@/app/i18next';

interface GroupNoticesTabProps {
  searchParams?: { page: string };
}

const GroupNoticesTab = ({
  lng,
  searchParams,
}: PropsWithLng<GroupNoticesTabProps>) => {
  const params = new URLSearchParams(searchParams);
  const page = parseInt(params.get('page') ?? '0');

  const sortByDeadline = false;

  return (
    <Suspense
      key={JSON.stringify(page)}
      fallback={<LoadingCatAnimation lng={lng} />}
    >
      <div className={'h-5'} />

      <CategorizedNotices
        sortByDeadline={sortByDeadline}
        noticeSearchParams={{}}
        lng={lng}
        page={page}
      />
    </Suspense>
  );
};

export default GroupNoticesTab;
