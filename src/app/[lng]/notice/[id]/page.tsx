import { Metadata, ResolvingMetadata } from 'next';

import { getNotice } from '@/api/notice/notice';

export const generateMetadata = async (
  { params: { id } }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const notice = await getNotice(Number.parseInt(id));
  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: notice.title,
    description: notice.body.slice(0, 100),
    keywords: notice.tags.map((tag) => tag.name),
    authors: [{ name: notice.author }],
    openGraph: { images: [...notice.imagesUrl, ...previousImages] },
  };
};

const DetailedNoticePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const notice = await getNotice(Number.parseInt(id));
  const hasImage = notice.imagesUrl.length > 0;
  return <>{JSON.stringify(notice)}</>;
};

export default DetailedNoticePage;
