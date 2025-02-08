'use server';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { auth } from '@/api/auth/auth';
import { getGroup, GroupInfo } from '@/api/group/group';
import { NoticeDetail } from '@/api/notice/notice';
import AuthorActions from '@/app/[lng]/(with-page-layout)/(with-sidebar-layout)/notice/[id]/AuthorActions';
import Tags from '@/app/components/shared/Tags';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';
import DefaultProfile from '@/assets/icons/default-profile.svg';

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
  groupId,
}: PropsWithLng<NoticeInfoProps>) => {
  const { t } = await createTranslation(lng);
  const session = await auth();

  const groupInfo = groupId ? await getGroup(groupId) : null;
  return (
    <div className="flex flex-col gap-[18px]">
      {deadline && <Deadline deadline={dayjs(deadline).tz()} t={t} />}

      <Metadata
        author={author.name}
        createdAt={dayjs(createdAt)}
        views={views}
        groupInfo={groupInfo}
        t={t}
      />

      {session?.user && session.user.uuid === author.uuid && (
        <AuthorActions noticeId={id} lng={lng} />
      )}

      <Title title={title} />

      <Tags tags={tags} className="flex-wrap" lng={lng} />
    </div>
  );
};

const Deadline = ({ deadline, t }: PropsWithT<{ deadline: dayjs.Dayjs }>) => {
  return (
    <div className="flex w-fit gap-[10px] rounded-[5px] bg-primary px-[13px] py-1 text-lg text-white dark:text-dark_white">
      <Trans t={t} i18nKey={'zabo.dueAt'}>
        {{ dueAt: deadline.format('LLL') }}
      </Trans>
    </div>
  );
};

const Title = ({ title }: { title: string }) => (
  <div className="line-clamp-3 text-[25px] font-semibold leading-[30px]">
    {title}
  </div>
);

const Metadata = ({
  author,
  createdAt,
  views,
  t,
  groupInfo,
}: PropsWithT<{
  author: string;
  createdAt: dayjs.Dayjs;
  views: number;
  groupInfo: GroupInfo | null;
}>) => {
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <>
      <div className={'flex items-center'}>
        {groupInfo?.profileImageUrl ? (
          <Image
            src={groupInfo.profileImageUrl}
            width={36}
            height={36}
            alt={groupInfo.name}
          />
        ) : (
          <DefaultProfile width={36} height={36} />
        )}

        {groupInfo ? (
          <Link
            href={`${process.env.NEXT_PUBLIC_GROUPS_URL}/group/${groupInfo.uuid}`}
          >
            <span className={'ml-2 text-lg font-medium'}>{groupInfo.name}</span>
          </Link>
        ) : (
          <span className={'ml-2 text-lg font-medium'}>{author}</span>
        )}

        <span className={'mx-[5px] font-bold text-greyDark'}>·</span>

        <span className={'font-medium text-greyDark'}>{timeAgo}</span>
      </div>
    </>
  );
};

export default NoticeInfo;
