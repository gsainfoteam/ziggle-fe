import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { TextZaboProps } from '@/app/components/organisms/Zabo/TextZabo';
import { T } from '@/app/i18next';

import Chip from '../../molecules/Chip';

interface NoticeInfoProps extends Omit<TextZaboProps, 'body'> {
  tags?: string[];
}

const NoticeInfo = ({
  deadline,
  title,
  author,
  createdAt,
  views,
  tags = [],
  t,
}: NoticeInfoProps & { t: T }) => {
  return (
    <div>
      {deadline && <Deadline deadline={dayjs(deadline)} />}
      <Title title={title} />
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
  <div className="font-bold text-2xl md:text-4xl">{title}</div>
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
  <div className="flex items-center gap-2 font-medium text-sm md:text-xl">
    <div>
      <Trans t={t} i18nKey="zabo.author">
        author <span className="font-bold">{{ author }}</span>
      </Trans>
    </div>
    <div className="h-5 md:h-7 w-0.5 bg-text dark:bg-secondaryText" />
    <div className="flex gap-4 text-secondaryText font-normal">
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

const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, i) => (
      <Chip key={i} className="font-normal">{`#${tag}`}</Chip>
    ))}
  </div>
);

export default NoticeInfo;
