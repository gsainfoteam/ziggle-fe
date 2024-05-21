import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { PropsWithLng } from '@/app/i18next';

export default async function Home({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const recentNotices = await getAllNotices({ orderBy: 'recent' });

  return (
    <main className="flex w-full flex-col gap-16 md:py-12">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col md:max-w-[800px]">
          {...recentNotices.list.map((notice) => (
            <>
              <Zabo key={notice.id} {...notice} lng={lng} />

              <div className="my-[30px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
