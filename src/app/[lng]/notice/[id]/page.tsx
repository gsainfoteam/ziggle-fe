import { Metadata, ResolvingMetadata } from 'next';

import { getNotice } from '@/api/notice/notice';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';

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
  params: { id },
}: {
  params: { id: string };
}) => {
  const notice = await getNotice(Number.parseInt(id));
  const hasImage = notice.imagesUrl.length > 0;
  return (
    <>
      {hasImage && <ZaboShowcase srcs={notice.imagesUrl} alt={notice.title} />}
      {JSON.stringify(notice)}
    </>
  );
};

export default DetailedNoticePage;
