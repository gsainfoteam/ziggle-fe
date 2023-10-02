import { Metadata, ResolvingMetadata } from 'next';

import { getNotice } from '@/api/notice/notice';
import ImageCarousel from '@/app/components/organisms/ImageCarousel';
import NoticeInfo from '@/app/components/organisms/NoticeInfo';
import HowAboutThese from '@/app/components/templates/HowAboutThese';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';
import { useTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import Actions from './Actions';
import Content from './Content';

export const generateMetadata = async (
  { params: { id } }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const notice = await getNotice(Number.parseInt(id));
  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: notice.title,
    description: notice.body.slice(0, 100).replace(/\n/g, ' '),
    keywords: notice.tags.map((tag) => tag.name),
    authors: [{ name: notice.author }],
    openGraph: {
      title: notice.title,
      description: notice.body.slice(0, 100).replace(/\n/g, ' '),
      url: `https://ziggle.gistory.me/notice/${id}`,
      images: [...notice.imagesUrl, ...previousImages],
    },
  };
};

const DetailedNoticePage = async ({
  params: { id, lng },
}: {
  params: { id: string; lng: Locale };
}) => {
  const { t } = await useTranslation(lng, 'translation');
  const notice = await getNotice(Number.parseInt(id));
  return (
    <>
      <ZaboShowcase srcs={notice.imagesUrl} alt={notice.title} />
      <div className="mt-8 md:mt-12 content mx-auto">
        {/* <Actions title={notice.title} />
        <div className="h-4 md:h-5" />
        <NoticeInfo
          title={notice.title}
          createdAt={notice.createdAt}
          views={notice.views}
          author={notice.author}
          deadline={notice.deadline}
          tags={notice.tags.map((tag) => tag.name)}
          t={t}
        />
        <div className="h-5" />
        <Content content={notice.body} />
        {notice.imagesUrl.length > 0 && (
          <>
            <div className="h-20" />
            <ImageCarousel srcs={notice.imagesUrl} alt={notice.title} />
          </>
        )}
        <div className="h-20" />
        <HowAboutThese /> */}
      </div>
    </>
  );
};

export default DetailedNoticePage;
