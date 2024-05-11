import dayjs from 'dayjs';
import { Metadata, ResolvingMetadata } from 'next';

import { auth } from '@/api/auth/auth';
import { getNotice } from '@/api/notice/get-notice';
import Tags from '@/app/components/organisms/Tags';
import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import DefaultProfile from '@/assets/default-profile.svg';

import Actions from './Actions';
import AddAdditionalNotice from './AddAdditionalNotice';
import AddtionalNotices from './AdditionalNotices';
import AuthorActions from './AuthorActions';
import Content from './Content';
import Deadline from './Deadline';
import ImageStack from './ImageStack';
import WriteEnglishNotice from './WriteEnglishNotice';

export const generateMetadata = async (
  {
    params: { id },
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
  const {
    title,
    langs,
    imageUrls,
    deadline,
    author,
    createdAt,
    id: noticeId,
    tags,
    content,
    additionalContents,
    currentDeadline,
  } = notice;

  const user = await auth();

  const isAdditionalNoticeShow = true;
  const isWriteEnglishNoticeShow = true;

  const supportEnglish = langs.includes('en');

  return (
    <div className="flex justify-center">
      {/* <ZaboShowcase srcs={notice.imageUrls} alt={title} lng={lng} /> */}
      <div className="content mt-8 md:mx-10 md:mt-12 md:w-[900px]">
        <div className="flex gap-5">
          {/* DESKTOP VIEW IMAGESTACK */}
          <div className="hidden md:block">
            {imageUrls.length > 0 && (
              <ImageStack srcs={imageUrls} alt={title} lng={lng} />
            )}
          </div>

          <div className="flex flex-col gap-4 md:w-7/12">
            {deadline && <Deadline deadline={dayjs(deadline)} lng={lng} />}
            <div className={'flex items-center'}>
              <DefaultProfile className="h-9 w-9" />
              <p className={'ml-2 text-lg font-medium'}>{author.name}</p>
              <p className={'mx-[5px] font-bold text-greyDark'}>·</p>
              <p className={'font-medium text-greyDark'}>
                {dayjs(createdAt).fromNow()} {/*TODO: Translate*/}
              </p>
            </div>
            <AuthorActions noticeId={noticeId} lng={lng} />
            <div className="text-2xl font-semibold ">{title}</div>
            <Tags tags={tags} className="flex-wrap" lng={lng} />

            {/* MOBILE VIEW IMAGESTACK */}
            <div className="md:hidden">
              {imageUrls.length > 0 && (
                <ImageStack
                  width={900}
                  srcs={imageUrls}
                  alt={title}
                  lng={lng}
                />
              )}
            </div>
            <Content content={content} />
            <Actions notice={notice} lng={lng} />
            <AddtionalNotices
              additionalContents={additionalContents}
              notice={notice}
              t={t}
              lng={lng}
            />
          </div>
        </div>

        <div className="h-4 md:h-5" />

        {user && user.id === author.uuid && isAdditionalNoticeShow && (
          <>
            <div className="h-10" id="addNotice" />
            <AddAdditionalNotice
              lng={lng}
              noticeId={Number(id)}
              originallyHasDeadline={deadline}
              supportedLanguage={langs}
            />
          </>
        )}

        {user &&
          user.id === author.uuid &&
          isWriteEnglishNoticeShow &&
          !supportEnglish && (
            <>
              <div className="h-10" />
              <WriteEnglishNotice
                noticeId={Number(id)}
                lng={lng}
                deadline={currentDeadline}
              />
            </>
          )}

        <div className="h-20" />
      </div>
    </div>
  );
};

export default DetailedNoticePage;
