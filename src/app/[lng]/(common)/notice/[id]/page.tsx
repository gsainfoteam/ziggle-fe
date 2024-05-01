import { Metadata, ResolvingMetadata } from 'next';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/get-notice';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import Actions from './Actions';
import AddAdditionalNotice from './AddAdditionalNotice';
import AddtionalNotices from './AdditionalNotices';
import AuthorActions from './AuthorActions';
import Content from './Content';
import ImageStack from './ImageStack';
import NoticeInfo from './NoticeInfo';
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
    <div className="flex justify-center">
      {/* <ZaboShowcase srcs={notice.imageUrls} alt={title} lng={lng} /> */}
      <div className="content mt-8 md:mx-10 md:mt-12 md:w-[900px]">
        <div className="flex gap-5">
          {/* DESKTOP VIEW IMAGESTACK */}
          <div className="hidden md:block">
            {notice.imageUrls.length > 0 && (
              <ImageStack srcs={notice.imageUrls} alt={title} lng={lng} />
            )}
          </div>

          <div className="flex flex-col gap-[18px] md:w-[60%]">
            <NoticeInfo
              {...notice}
              currentDeadline={notice.currentDeadline ?? null}
              lng={lng}
            />

            {/* MOBILE VIEW IMAGESTACK */}
            <div className="md:hidden">
              {notice.imageUrls.length > 0 && (
                <ImageStack
                  width={900}
                  srcs={notice.imageUrls}
                  alt={title}
                  lng={lng}
                />
              )}
            </div>

            <Content content={notice.content} />

            <Actions notice={notice} lng={lng} />

            <AddtionalNotices
              additionalContents={notice.additionalContents}
              notice={notice}
              t={t}
              lng={lng}
            />
          </div>
        </div>

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

        <div className="h-20" />
      </div>
    </div>
  );
};

export default DetailedNoticePage;
