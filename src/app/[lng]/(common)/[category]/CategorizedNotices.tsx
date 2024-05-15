import { NoticeSearchParams } from '@/api/notice/notice';
import { getAllNotices } from '@/api/notice/notice-server';
import Pagination from '@/app/components/molecules/Pagination';
import Zabo from '@/app/components/organisms/Zabo';
import { PropsWithLng } from '@/app/i18next';

interface CategorizedNoticesProps {
  sortByDeadline: boolean;
  noticeSearchParams?: NoticeSearchParams;
  page: number;
}

const CategorizedNotices = async ({
  sortByDeadline,
  noticeSearchParams,
  lng,
  page,
}: PropsWithLng<CategorizedNoticesProps>) => {
  const notices = await getAllNotices(
    sortByDeadline
      ? { ...noticeSearchParams, orderBy: 'deadline' }
      : noticeSearchParams,
  ).catch(() => ({ list: [], total: 0 }));

  return (
    <>
      <div className="flex w-full flex-col md:max-w-[800px]">
        {...notices.list.map((notice) => (
          <>
            <Zabo key={notice.id} {...notice} lng={lng} />
            <div className="my-[60px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
          </>
        ))}
      </div>
      <Pagination page={page} items={notices.total} itemsPerPage={30} />
    </>
  );
};

export default CategorizedNotices;
