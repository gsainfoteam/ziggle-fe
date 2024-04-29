import { Metadata, ResolvingMetadata } from 'next';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/get-notice';
import ImageCarousel from '@/app/components/organisms/ImageCarousel';
import HowAboutThese from '@/app/components/templates/HowAboutThese';
import ZaboShowcase from '@/app/components/templates/ZaboShowcase';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import Actions from './Actions';
import AddAdditionalNotice from './AddAdditionalNotice';
import AddtionalNotices from './AdditionalNotices';
import AuthorActions from './AuthorActions';
import Content from './Content';
import ImageStack from './ImageStack';
import NoticeInfo from './NoticeInfo';
import Reactions from './Reactions';
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

  return {
    title: notice.title,
    description: notice.content.slice(0, 100).replace(/\n/g, ' '),
    keywords: notice.tags,
    authors: [{ name: notice.author.name }],
    openGraph: {
      title: notice.title,
      description: notice.content.slice(0, 100).replace(/\n/g, ' '),
      url: `https://ziggle.gistory.me/notice/${id}`,
      images: [...notice.imageUrls, ...previousImages],
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

  const title = notice.title;

  const user = await auth();

  const isAdditionalNoticeShow = true;
  const isWriteEnglishNoticeShow = true;

  const supportEnglish = notice.langs.includes('en');

  return (
    <>
      {/* <ZaboShowcase srcs={notice.imageUrls} alt={title} lng={lng} /> */}
      <div className="content mx-auto mt-8 md:mt-12">
        <div className="flex gap-5">
          {notice.imageUrls.length > 0 && (
            <ImageStack srcs={notice.imageUrls} alt={title} />
          )}

          <div className="max-w-[500px]">
            <NoticeInfo
              {...notice}
              currentDeadline={notice.currentDeadline ?? null}
              lng={lng}
            />
            <div className="h-5" />
            <Content content={notice.content} />

            <div className="h-10" />
            <AddtionalNotices
              additionalContents={notice.additionalContents}
              notice={notice}
              t={t}
              lng={lng}
            />
          </div>
        </div>

        {/* <Actions title={title} lng={lng} /> */}

        {/* temporarily disabled authorActions. should enable it later */}
        {/* {user && user.id === notice.author.uuid && (
          <>
            <div className="h-5" />
            <AuthorActions
              isEnglishNoticeExist={supportEnglish}
              isAdditionalNoticeLimit={false}
              noticeId={Number(id)}
              lng={lng}
            />
          </>
        )} */}

        <div className="h-4 md:h-5" />

        {user && user.id === notice.author.uuid && isAdditionalNoticeShow && (
          <>
            <div className="h-10" id="addNotice" />
            <AddAdditionalNotice
              lng={lng}
              noticeId={Number(id)}
              originallyHasDeadline={notice.deadline}
              supportedLanguage={notice.langs}
            />
          </>
        )}

        {user &&
          user.id === notice.author.uuid &&
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

        <div className={'mt-6 flex justify-center'}>
          <Reactions notice={notice} />
        </div>

        {notice.imageUrls.length > 0 && (
          <>
            <div className="h-20" />
            <ImageCarousel srcs={notice.imageUrls} alt={title} lng={lng} />
          </>
        )}
        <div className="h-20" />
        <HowAboutThese lng={lng} />
      </div>
    </>
  );
};

export default DetailedNoticePage;
