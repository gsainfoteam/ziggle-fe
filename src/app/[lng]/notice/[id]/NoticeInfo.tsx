'use server';

import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { NoticeDetail, Tag } from '@/api/notice/notice';
import Chip from '@/app/components/molecules/Chip';
import DDay from '@/app/components/molecules/DDay';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';
import { T } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import getLocaleContents from '@/utils/getLocaleContents';

interface NoticeInfoProps extends Omit<NoticeDetail, 'body'> {}

const NoticeInfo = async ({
  currentDeadline: deadline,
  contents,
  author,
  createdAt,
  views,
  tags = [],
  lng,
}: PropsWithLng<NoticeInfoProps>) => {
  const { t } = await createTranslation(lng);
  const localeContents = getLocaleContents(contents, lng);

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

const Deadline = ({ deadline, t }: PropsWithT<{ deadline: dayjs.Dayjs }>) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-lg font-medium md:text-2xl">
        {t('zabo.dueAt', { dueAt: deadline.format('LLL') })}
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
}: PropsWithT<{
  author: string;
  createdAt: dayjs.Dayjs;
  views: number;
}>) => (
  <div className="flex items-center gap-4 text-sm font-medium md:text-xl">
    <div>
      <Trans t={t} i18nKey="zabo.author">
        author <span className="font-bold">{{ author }}</span>
      </Trans>
    </div>
    <div className="h-5 w-0.5 bg-text dark:bg-secondaryText md:h-7" />
    <div className="flex gap-4 font-normal text-secondaryText">
      <Trans t={t} i18nKey="zabo.createdAt">
        createdAt {{ createdAt: createdAt.format('LLL') }}
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
