'use server';

import dayjs from 'dayjs';
import Image from 'next/image';
import { Trans } from 'react-i18next/TransWithoutContext';

import { NoticeDetail } from '@/api/notice/notice';
import DDay from '@/app/components/molecules/DDay';
import Tags from '@/app/components/organisms/Tags';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';
import DefaultProfile from '@/assets/default-profile.jpeg';

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
    <div className="flex flex-col gap-[18px]">
      {deadline && <Deadline deadline={dayjs(deadline).tz()} t={t} />}

      <Metadata
        author={author.name}
        createdAt={dayjs(createdAt)}
        views={views}
        t={t}
      />

      <Title title={title} />

      <Tags tags={tags} className="flex-wrap" lng={lng} />
    </div>
  );
};

const Deadline = ({ deadline, t }: PropsWithT<{ deadline: dayjs.Dayjs }>) => {
  return (
    <div className="flex w-fit gap-[10px] rounded-[5px] bg-primary px-[13px] py-1 text-lg text-white">
      <span className="font-regular">{t('zabo.dueAt')}</span>
      <span className="font-medium">{deadline.format('LLL')}</span>
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
        <Image src={DefaultProfile} alt={author} width={36} height={36} />

        <p className={'ml-2 text-lg font-medium'}>{author}</p>

        <p className={'mx-[5px] font-bold text-[#6E6E73]'}>·</p>

        <p className={'font-medium text-[#6E6E73]'}>{timeAgo}</p>
      </div>
    </>
  );
};

export default NoticeInfo;
