import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { NoticeDetail, Tag } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import getLocaleContents from '@/utils/getLocaleContents';

import Chip from '../../molecules/Chip';
import DDay from '../../molecules/DDay';

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
      {deadline && (
        <>
          <Deadline deadline={dayjs(deadline)} t={t} />
          <div className="h-2" />
        </>
      )}
      <Title title={localeContents[0].title} />
      <div className="h-2" />
      <Metadata
        author={author}
        createdAt={dayjs(createdAt)}
        views={views}
        t={t}
      />
      <div className="h-4" />
      <Tags tags={tags} />
    </div>
  );
};

const Deadline = ({ deadline, t }: { deadline: dayjs.Dayjs } & { t: T }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-lg font-medium md:text-2xl">
        {t('zabo.dueAt', { dueAt: deadline.format('LLLL') })}
      </div>
      <DDay deadline={deadline} t={t} />
    </div>
  );
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
