'use server';

import dayjs from "dayjs";
import { Trans } from "react-i18next/TransWithoutContext";

import { NoticeDetail } from "@/api/notice/notice";
import Tags from "@/app/components/organisms/Tags";
import { createTranslation, PropsWithLng, PropsWithT } from "@/app/i18next";
import DefaultProfile from "@/assets/default-profile.svg";
import { auth } from "@/api/auth/auth";
import AuthorActions from "@/app/[lng]/(common)/(needSidebar)/notice/[id]/AuthorActions";

interface NoticeInfoProps extends Omit<NoticeDetail, 'body'> {}

const NoticeInfo = async ({
  id,
  currentDeadline: deadline,
  title,
  content,
  author,
  createdAt,
  views,
  tags = [],
  lng,
}: PropsWithLng<NoticeInfoProps>) => {
  const { t } = await createTranslation(lng);
  const user = await auth();

  return (
    <div className="flex flex-col gap-[18px]">
      {deadline && <Deadline deadline={dayjs(deadline).tz()} t={t} />}

      <Metadata
        author={author.name}
        createdAt={dayjs(createdAt)}
        views={views}
        t={t}
      />

      {user && user.uuid === author.uuid && (
        <AuthorActions noticeId={Number(id)} lng={lng} />
      )}

      <Title title={title} />

      <Tags tags={tags} className="flex-wrap" lng={lng} />
    </div>
  );
};

const Deadline = ({ deadline, t }: PropsWithT<{ deadline: dayjs.Dayjs }>) => {
  return (
    <div className="flex w-fit gap-[10px] rounded-[5px] bg-primary px-[13px] py-1 text-lg text-white">
      <Trans t={t} i18nKey={'zabo.dueAt'}>
        {{ dueAt: deadline.format('LLL') }}
      </Trans>
    </div>
  );
};

const Title = ({ title }: { title: string }) => (
  <div className="text-[25px] font-semibold leading-[30px]">{title}</div>
);

const Metadata = ({
  author,
  createdAt,
  views,
  t,
}: PropsWithT<{
  author: string;
  createdAt: dayjs.Dayjs;
  views: number;
}>) => {
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <>
      <div className={'flex items-center'}>
        <DefaultProfile width={36} height={36} />

        <p className={'ml-2 text-lg font-medium'}>{author}</p>

        <p className={'mx-[5px] font-bold text-greyDark'}>·</p>

        <p className={'font-medium text-greyDark'}>{timeAgo}</p>
      </div>
    </>
  );
};

export default NoticeInfo;
