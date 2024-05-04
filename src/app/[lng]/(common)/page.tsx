import { getAllNotices } from '@/api/notice/notice-server';
import Zabo from '@/app/components/organisms/Zabo';

import ZaboCarousel from '../../components/templates/ZaboCarousel';
import { createTranslation, PropsWithLng } from '../../i18next';

export const dynamic = 'force-dynamic';

export default async function Home({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  // const [deadline, hot, event, recruit, general, academic] = await Promise.all([
  //   getAllNotices({ orderBy: 'deadline' }),
  //   getAllNotices({ orderBy: 'hot' }),
  //   getAllNotices({ tags: ['event'], orderBy: 'recent' }),
  //   getAllNotices({ tags: ['recruit'], orderBy: 'recent' }),
  //   getAllNotices({ tags: ['general'], orderBy: 'recent' }),
  //   getAllNotices({ tags: ['academic'], orderBy: 'recent' }),
  // ]);

  const recentNotices = await getAllNotices({ orderBy: 'recent' });

  return (
    <main className="flex w-full flex-col gap-16 md:py-12">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col md:max-w-[800px]">
          {...recentNotices.list.map((notice) => (
            <>
              <Zabo key={notice.id} {...notice} t={t} lng={lng} />

              <div className="my-[60px] h-[1px] bg-greyLight" />
            </>
          ))}
        </div>
      </div>

      {/* <ZaboCarousel
        notices={deadline.list}
        title={t('notices.deadline.label')}
        height={300}
        carouselClassName="bg-primary/10"
        sectionHref="/section/urgent"
        lng={lng}
      />
      <ZaboCarousel
        notices={hot.list}
        title={t('notices.hot.label')}
        height={300}
        sectionHref="/section/hot"
        lng={lng}
      />
      <ZaboCarousel
        notices={event.list}
        title={t('notices.event.label')}
        height={300}
        sectionHref="/section/event"
        lng={lng}
      />
      <ZaboCarousel
        notices={recruit.list}
        title={t('notices.recruit.label')}
        height={300}
        sectionHref="/section/recruit"
        lng={lng}
      />
      <ZaboCarousel
        notices={general.list}
        title={t('notices.general.label')}
        height={300}
        sectionHref="/section/general"
        lng={lng}
      />
      <ZaboCarousel
        notices={academic.list}
        title={t('notices.academic.label')}
        height={300}
        sectionHref="https://www.gist.ac.kr/kr/html/sub05/050209.html"
        lng={lng}
      /> */}
    </main>
  );
}
