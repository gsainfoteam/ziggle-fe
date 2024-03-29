'use server';

import dayjs from 'dayjs';
import { Trans } from 'react-i18next/TransWithoutContext';

import { NoticeDetail } from '@/api/notice/notice';
import DDay from '@/app/components/molecules/DDay';
import Tags from '@/app/components/organisms/Tags';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';

interface NoticeInfoProps extends Omit<NoticeDetail, 'body'> {}

const NoticeInfo = async ({
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

  return (
    <div>
      {deadline && (
        <>
          <Deadline deadline={dayjs(deadline).tz()} t={t} />
          <div className="h-2" />
        </>
      )}
      <Title title={title} />
      <div className="h-2" />
      <Metadata
        author={author.name}
        createdAt={dayjs(createdAt)}
        views={views}
        t={t}
      />
      <div className="h-4" />
      <Tags tags={tags} className="flex-wrap" lng={lng} />
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
        createdAt {{ createdAt: createdAt.tz().format('LLL') }}
      </Trans>
      {' · '}
      <Trans t={t} i18nKey="zabo.views">
        views {{ views }}
      </Trans>
    </div>
  </div>
);

export default NoticeInfo;
