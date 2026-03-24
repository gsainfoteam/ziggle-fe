import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Avatar } from '@/common/components';
import { useUser } from '@/features/auth';

import { AuthorActions } from './components/author-actions';
import { Tags } from './components/tags';

import type { Author, NoticeDetail } from '../models';

export const NoticeInfo = ({
  id,
  currentDeadline: deadline,
  title,
  author,
  createdAt,
  views,
  tags = [],
}: NoticeDetail) => {
  const { data: user } = useUser();

  return (
    <div className="flex flex-col gap-4.5">
      {deadline && <Deadline deadline={dayjs(deadline).tz()} />}

      <Metadata author={author} createdAt={dayjs(createdAt)} views={views} />

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
}: {
  author: Author;
  createdAt: dayjs.Dayjs;
  views: number;
}) => {
  const timeAgo = dayjs(createdAt).fromNow();

  return (
    <>
      <div className="flex items-center">
        <Avatar
          name={author.name}
          picture={author.picture}
          imageClassName="size-9"
          className="gap-2"
          labelClassName="text-lg"
        />

        <span className="text-greyDark mx-1.25 font-bold">·</span>

        <span className="text-greyDark font-medium">{timeAgo}</span>
      </div>
    </>
  );
};

export default NoticeInfo;
