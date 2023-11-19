import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { NoticeDetail, Tag } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import getLocaleContents from '@/utils/getLocaleContents';

import Chip from '../../molecules/Chip';

interface NoticeInfoProps extends Omit<NoticeDetail, 'body'> {
  t: T;
}

const NoticeInfo = ({
  currentDeadline: deadline,
  contents,
  author,
  createdAt,
  views,
  tags = [],
  t,
}: NoticeInfoProps & { t: T }) => {
  const language = t('lang');
  const localeContents = getLocaleContents(contents, language);

  return (
    <div>
      {deadline && <Deadline deadline={dayjs(deadline)} />}
      <Title title={localeContents[0].title} />
      <div className="h-1" />
      <Metadata
        author={author}
        createdAt={dayjs(createdAt)}
        views={views}
        t={t}
      />
      <div className="h-1" />
      <Tags tags={tags} />
    </div>
  );
};

const Deadline = ({ deadline }: { deadline: dayjs.Dayjs }) => {
  return null;
};

const Title = ({ title }: { title: string }) => (
  <div className="text-2xl font-bold md:text-4xl">{title}</div>
);

const Metadata = ({
  author,
  createdAt,
  views,
  t,
}: {
  author: string;
  createdAt: dayjs.Dayjs;
  views: number;
  t: T;
}) => (
  <div className="flex items-center gap-2 text-sm font-medium md:text-xl">
    <div>
      <Trans t={t} i18nKey="zabo.author">
        author <span className="font-bold">{{ author }}</span>
      </Trans>
    </div>
    <div className="h-5 w-0.5 bg-text dark:bg-secondaryText md:h-7" />
    <div className="flex gap-4 font-normal text-secondaryText">
      <Trans t={t} i18nKey="zabo.createdAt">
        createdAt {{ createdAt: createdAt.format('L') }}
      </Trans>
      {' · '}
      <Trans t={t} i18nKey="zabo.views">
        views {{ views }}
      </Trans>
    </div>
  </div>
);

const Tags = ({ tags }: { tags: Tag[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, i) => (
      <Chip key={i} className="font-normal">{`#${tag.name}`}</Chip>
    ))}
  </div>
);

export default NoticeInfo;
