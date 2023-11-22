import { GetServerSideProps, Metadata, ResolvingMetadata } from 'next';
import { useRouter } from 'next/router';
import { createServerContext } from 'react';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/notice';
import ImageCarousel from '@/app/components/organisms/ImageCarousel';
import NoticeInfo from '@/app/components/organisms/NoticeInfo';
import HowAboutThese from '@/app/components/templates/HowAboutThese';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import getLocaleContents from '@/utils/getLocaleContents';

import Actions from './Actions';
import AddAdditionalNotice from './AddAdditionalNotice';
import AddtionalNotices from './AdditionalNotices';
import AuthorActions from './AuthorActions';
import Content from './Content';
import WriteEnglishNotice from './WriteEnglishNotice';

export const generateMetadata = async (
  {
    params: { id },
    searchParams,
  }: { params: { id: string }; searchParams: { writeEn: string; lng: Locale } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const notice = await getNotice(Number.parseInt(id));
  const previousImages = (await parent).openGraph?.images ?? [];

  const localeContents = getLocaleContents(notice.contents, searchParams.lng);

  return {
    title: localeContents[0].title,
    description: localeContents[0].body.slice(0, 100).replace(/\n/g, ' '),
    keywords: notice.tags.map((tag) => tag.name),
    authors: [{ name: notice.author }],
    openGraph: {
      title: localeContents[0].title,
      description: localeContents[0].body.slice(0, 100).replace(/\n/g, ' '),
      url: `https://ziggle.gistory.me/notice/${id}`,
      images: [...notice.imagesUrl, ...previousImages],
    },
  };
};

interface DetailedNoticePageProps {
  params: { id: string; lng: Locale };
}

const DetailedNoticePage = async ({
  params: { id, lng },
}: DetailedNoticePageProps) => {
  const { t } = await createTranslation(lng, 'translation');
  const notice = await getNotice(Number.parseInt(id));

  const localContents = getLocaleContents(notice.contents, lng);

  const title = localContents[0].title;

  const user = await auth();

  const isAdditionalNoticeShow = true;
  const isWriteEnglishNoticeShow = true;

  const supportLanguage = notice.contents.map((content) => content.lang); // TODO: make this unique
  const supportEnglish = supportLanguage.includes('en');

  return (
    <>
      <ZaboShowcase srcs={notice.imagesUrl} alt={title} lng={lng} />
      <div className="content mx-auto mt-8 md:mt-12">
        <Actions title={localContents[0].body} lng={lng} />

        {user && user.id === notice.authorId && (
          <>
            <div className="h-5" />
            <AuthorActions
              isEnglishNoticeExist={supportEnglish}
              isAdditionalNoticeLimit={false}
              noticeId={Number(id)}
              lng={lng}
            />
          </>
        )}

        <div className="h-4 md:h-5" />
        <NoticeInfo
          {...notice}
          currentDeadline={notice.currentDeadline ?? null}
          lng={lng}
        />
        <div className="h-5" />
        <Content content={localContents[0].body} />

        <div className="h-10" />
        <AddtionalNotices contents={localContents} t={t} lng={lng} />

        {user && user.id === notice.authorId && isAdditionalNoticeShow && (
          <>
            <div className="h-10" id="addNotice" />
            <AddAdditionalNotice
              lng={lng}
              noticeId={Number(id)}
              originallyHasDeadline={notice.currentDeadline}
              supportLanguage={supportLanguage}
            />
          </>
        )}

        {user &&
          user.id === notice.authorId &&
          isWriteEnglishNoticeShow &&
          !supportEnglish && (
            <>
              <div className="h-10" />
              <WriteEnglishNotice
                noticeId={Number(id)}
                lng={lng}
                deadline={notice.currentDeadline}
              />
            </>
          )}

        {notice.imagesUrl.length > 0 && (
          <>
            <div className="h-20" />
            <ImageCarousel srcs={notice.imagesUrl} alt={title} lng={lng} />
          </>
        )}
        <div className="h-20" />
        <HowAboutThese lng={lng} />
      </div>
    </>
  );
};

export default DetailedNoticePage;
