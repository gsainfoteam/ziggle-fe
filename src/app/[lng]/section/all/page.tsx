import { getAllNotices } from '@/api/notice/notice';
import Pagination from '@/app/components/molecules/Pagination';
import { Locale } from '@/app/i18next/settings';

import NoticesLoadingWrapper from './NoticesLoadingWrapper';

const AllNoticePage = async ({
  searchParams,
}: {
  params: { lng: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { page } = searchParams;
  const pageNumber = Number(page) || 0;
  const notices = await getAllNotices({ limit: 0, orderBy: 'recent' });

  return (
    <div className="content mx-auto">
      <div className="flex justify-center">
        <Pagination page={pageNumber} pages={Math.ceil(notices.total / 30)} />
      </div>
      <div className="h-7" />
      <NoticesLoadingWrapper key={pageNumber} />
      <div className="h-24" />
      <div className="flex justify-center">
        <Pagination page={pageNumber} pages={Math.ceil(notices.total / 30)} />
      </div>
    </div>
  );
};

export default AllNoticePage;
