import { getAllNotices } from '@/api/notice/notice';

import ZaboCarousel from '../components/templates/ZaboCarousel';
import { useTranslation } from '../i18next';
import { Locale } from '../i18next/settings';

export default async function Home({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = await useTranslation(lng, 'translation');

  const [deadline, hot, event, recruit, general, academic] = await Promise.all([
    getAllNotices({ orderBy: 'deadline' }),
    getAllNotices({ orderBy: 'hot' }),
    getAllNotices({ tags: ['event'] }),
    getAllNotices({ tags: ['recruit'] }),
    getAllNotices({ tags: ['general'] }),
    getAllNotices({ tags: ['academic'] }),
  ]);

  return (
    <main className="flex flex-col gap-16 md:py-12">
      <ZaboCarousel
        notices={deadline.list}
        title={t('notices.deadline.label')}
        height={300}
        carouselClassName="bg-primary/10"
        sectionHref="/section/urgent"
      />
      <ZaboCarousel
        notices={hot.list}
        title={t('notices.hot.label')}
        height={300}
        sectionHref="/section/hot"
      />
      <ZaboCarousel
        notices={event.list}
        title={t('notices.event.label')}
        height={300}
        sectionHref="/section/event"
      />
      <ZaboCarousel
        notices={recruit.list}
        title={t('notices.recruit.label')}
        height={300}
        sectionHref="/section/recruit"
      />
      <ZaboCarousel
        notices={general.list}
        title={t('notices.general.label')}
        height={300}
        sectionHref="/section/general"
      />
      <ZaboCarousel
        notices={academic.list}
        title={t('notices.academic.label')}
        height={300}
      />
    </main>
  );
}
