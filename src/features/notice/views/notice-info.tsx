import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import { useUser } from '@/features/auth';

import { AuthorActions } from './components/author-actions';
import { Tags } from './components/tags';

import type { Group, NoticeDetail } from '../models';

export const NoticeInfo = ({
  id,
  currentDeadline: deadline,
  title,
  author,
  createdAt,
  views,
  tags = [],
  group,
}: NoticeDetail) => {
  const { data: user } = useUser();

  return (
    <div className="flex flex-col gap-4.5">
      {deadline && <Deadline deadline={dayjs(deadline).tz()} />}

      <Metadata
        author={author.name}
        createdAt={dayjs(createdAt)}
        views={views}
        group={group}
      />

      {user?.uuid === author.uuid && <AuthorActions noticeId={id} />}

      <Title title={title} />

      <Tags tags={tags} className="flex-wrap" />
    </div>
  );
};

const Deadline = ({ deadline }: { deadline: dayjs.Dayjs }) => {
  const { t } = useTranslation('notice');
  return (
    <div className="bg-primary dark:text-dark_white flex w-fit gap-2.5 rounded-[5px] px-3.25 py-1 text-lg text-white">
      {t('detail.due_at', { dueAt: deadline.format('LLL') })}
    </div>
  );
};

const Title = ({ title }: { title: string }) => (
  <div className="line-clamp-3 text-[25px] leading-7.5 font-semibold">
    {title}
  </div>
);

const Metadata = ({
  author,
  createdAt,
  group,
}: {
  author: string;
  createdAt: dayjs.Dayjs;
  views: number;
  group?: Group;
}) => {
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <>
      <div className="flex items-center">
        {group?.profileImageUrl ? (
          <img
            src={group.profileImageUrl}
            width={36}
            height={36}
            alt={group.name}
          />
        ) : (
          <DefaultProfile width={36} height={36} />
        )}

        {group ? (
          // <Link
          //   href={`${process.env.NEXT_PUBLIC_GROUPS_URL}/group/${group.uuid}`}
          // >
          //   <span className="ml-2 text-lg font-medium">{group.name}</span>
          // </Link>
          // TODO: implement with groups feature
          <></>
        ) : (
          <span className="ml-2 text-lg font-medium">{author}</span>
        )}

        <span className="text-greyDark mx-1.25 font-bold">·</span>

        <span className="text-greyDark font-medium">{timeAgo}</span>
      </div>
    </>
  );
};

export default NoticeInfo;
