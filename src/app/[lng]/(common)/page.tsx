import { getAllNotices } from '@/api/notice/notice-server';
import Zabo from '@/app/components/organisms/Zabo';

import { createTranslation, PropsWithLng } from '../../i18next';

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  const recentNotices = await getAllNotices({ orderBy: 'recent' });

  return (
    <main className="flex w-full flex-col gap-16 md:py-12">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col md:max-w-[800px]">
          {...recentNotices.list.map((notice) => (
            <>
              <Zabo key={notice.id} {...notice} lng={lng} />

              <div className="my-[60px] h-[1px] bg-greyLight" />
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
