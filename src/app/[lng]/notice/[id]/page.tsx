import { Metadata, ResolvingMetadata } from 'next';

import { getNotice } from '@/api/notice/notice';
import NoticeInfo from '@/app/components/organisms/NoticeInfo';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';
import { useTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

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
  const hasImage = notice.imagesUrl.length > 0;
  return (
    <>
      {hasImage && <ZaboShowcase srcs={notice.imagesUrl} alt={notice.title} />}
      <div className="mt-8 md:mt-12 content mx-auto">
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
        <div className="h-20" />
        <div className="h-20" />
      </div>
    </>
  );
};

export default DetailedNoticePage;
