import { GetServerSideProps, Metadata, ResolvingMetadata } from 'next';
import { useRouter } from 'next/router';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/notice';
import ImageCarousel from '@/app/components/organisms/ImageCarousel';
import NoticeInfo from '@/app/components/organisms/NoticeInfo';
import HowAboutThese from '@/app/components/templates/HowAboutThese';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import getLocaleContents from '@/utils/getLocaleContents';

import Actions from './Actions';
import AddAddtionalNotice from './AddAddtionalNotice';
import AddtionalNotices from './AddtionalNotices';
import AuthorActions from './AuthorActions';
import Content from './Content';

export const generateMetadata = async (
  { params: { id } }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const notice = await getNotice(Number.parseInt(id));
  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: notice.contents[0].title,
    description: notice.contents[0].body.slice(0, 100).replace(/\n/g, ' '),
    keywords: notice.tags.map((tag) => tag.name),
    authors: [{ name: notice.author }],
    openGraph: {
      title: notice.contents[0].title,
      description: notice.contents[0].body.slice(0, 100).replace(/\n/g, ' '),
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
  const { t, i18n } = await createTranslation(lng, 'translation');
  const language = i18n.language;
  const notice = await getNotice(Number.parseInt(id));

  const localContents = getLocaleContents(notice.contents, language);

  const title = localContents[0].title;

  const user = await auth();

  const isAdditionalNoticeShow = true;

  return (
    <>
      <ZaboShowcase srcs={notice.imagesUrl} alt={title} />
      <div className="content mx-auto mt-8 md:mt-12">
        <Actions title={localContents[0].body} />

        {user && user.id === notice.authorId && (
          <>
            <div className="h-5" />
            <AuthorActions
              isEnglishNoticeExist={false}
              isAdditionalNoticeLimit={false}
              lng={lng}
            />
          </>
        )}

        <div className="h-4 md:h-5" />
        <NoticeInfo
          {...notice}
          currentDeadline={notice.currentDeadline ?? null}
          t={t}
        />
        <div className="h-5" />
        <Content content={localContents[0].body} />

        <div className="h-10" />
        <AddtionalNotices contents={localContents} t={t} />

        {user && user.id === notice.authorId && isAdditionalNoticeShow && (
          <>
            <div className="h-10" />
            <AddAddtionalNotice
              noticeId={Number(id)}
              originallyHasDeadline={notice.currentDeadline}
              supportLanguage={notice.contents.map((content) => content.lang)} // TODO: make this unique
            />
          </>
        )}

        {notice.imagesUrl.length > 0 && (
          <>
            <div className="h-20" />
            <ImageCarousel srcs={notice.imagesUrl} alt={title} />
          </>
        )}
        <div className="h-20" />
        <HowAboutThese />
      </div>
    </>
  );
};

export default DetailedNoticePage;
