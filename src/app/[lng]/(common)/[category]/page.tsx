import { getAllNotices } from '@/api/notice/notice-server';
import Toggle from '@/app/components/atoms/Toggle/Toggle';
import Zabo from '@/app/components/organisms/Zabo';
import { sidebarObject } from '@/app/components/templates/Sidebar/sidebarObject';

import { createTranslation, PropsWithLng } from '../../../i18next';
import { HomePath } from './paths';

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lng, category },
}: {
  params: PropsWithLng & {
    category: HomePath;
  };
}) {
  const { t } = await createTranslation(lng);

  const { noticeSearchParams, icons, title } =
    sidebarObject.flat(2).find(({ path }) => path === category) ??
    sidebarObject[0][0]; // default to home
  const notices = await getAllNotices(noticeSearchParams);

  console.log(noticeSearchParams);

  return (
    <main className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center">
        {category !== 'home' && (
          <div className="flex w-full flex-row items-center gap-2 py-5 text-4xl font-bold text-primary md:max-w-[800px]">
            <icons.bold className="fill-primary stroke-text dark:stroke-none" />
            {t(title)}
          </div>
        )}
        <div className="flex w-full flex-col md:max-w-[800px]">
          {...notices.list.map((notice) => (
            <>
              <Zabo key={notice.id} {...notice} lng={lng} />
              <div className="my-[60px] h-[1px] bg-greyLight dark:bg-dark_greyBorder" />
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
