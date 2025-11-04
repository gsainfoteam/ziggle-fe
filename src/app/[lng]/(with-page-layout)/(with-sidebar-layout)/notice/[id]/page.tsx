import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { getNotice } from '@/api/notice/get-notice';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import Actions from './Actions';
import AdditionalNotices from './AdditionalNotices';
import Content from './Content';
import ImageStack from './ImageStack';
import NoticeInfo from './NoticeInfo';
import SendPushAlarm from './SendPushNotificationAlert';

export const generateMetadata = async (
  { searchParams: { lng } }: { searchParams: { lng: Locale } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { t } = await createTranslation(lng);
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: 'ziggle, GIST, notice',
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: `https://ziggle.gistory.me/`,
      images: [...previousImages],
    },
  };
};

interface DetailedNoticePageProps {
  params: { id: string; lng: Locale };
}

const DetailedNoticePage = async ({
  params: { id, lng },
}: DetailedNoticePageProps) => {
  const notice = await getNotice(Number.parseInt(id), lng).catch(() => null);
  if (!notice) return notFound();

  const title = notice.title;

  const additionalContents = Object.values(
    notice.additionalContents.reduce<
      Record<number, (typeof notice.additionalContents)[number]>
    >(
      (prev, curr) => ({
        ...prev,
        [curr.id]: prev[curr.id]?.lang === lng ? prev[curr.id] : curr,
      }),
      {},
    ),
  );

  return (
    <div className="flex justify-center">
      <div className="content mt-8 md:mt-12 md:w-[900px] md:min-w-[600px]">
        <div className="flex gap-5">
          {/* DESKTOP VIEW IMAGE STACK */}
          <div className="hidden md:block">
            {notice.imageUrls.length > 0 && (
              <ImageStack sources={notice.imageUrls} alt={title} lng={lng} />
            )}
          </div>

          <div className="flex flex-col gap-[18px] md:w-[60%]">
            <SendPushAlarm {...notice} lng={lng} />

            <NoticeInfo
              {...notice}
              currentDeadline={notice.currentDeadline ?? null}
              lng={lng}
            />

            {/* MOBILE VIEW IMAGE STACK */}
            <div className="md:hidden">
              {notice.imageUrls.length > 0 && (
                <ImageStack
                  width={900}
                  sources={notice.imageUrls}
                  alt={title}
                  lng={lng}
                />
              )}
            </div>

            <Content content={notice.content} />

            <Actions notice={notice} lng={lng} />

            <AdditionalNotices
              additionalContents={additionalContents}
              notice={notice}
              lng={lng}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedNoticePage;
