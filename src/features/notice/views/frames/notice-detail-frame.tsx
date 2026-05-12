import { useEffect } from 'react';

import { useLoaderData } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NoticeNotFoundFrame } from './notice-not-found-frame';
import { useNotice } from '../../viewmodels';
import { SendPushAlarm } from '../components/modals/send-push-notification';
import { NoticeDetail } from '../components/notice-detail';

export function NoticeDetailFrame() {
  const { notice: preloadedNotice, numId } = useLoaderData({
    from: '/_layout/_sidebar/notice/$id',
  });
  const { data: notice, isLoading, isNotFound } = useNotice(numId);
  const efficientNotice = notice ?? preloadedNotice;
  const { t, i18n } = useTranslation('common');
  const { data: user } = useUser();

  useEffect(() => {
    document.title = efficientNotice.title;
    return () => {
      document.title = t('app_name');
    };
  }, [efficientNotice.title, t]);

  if (isNotFound) {
    return <NoticeNotFoundFrame />;
  }

  if (isLoading || !efficientNotice) {
    return <Loading />;
  }

  const additionalContents = Object.values(
    efficientNotice.additionalContents.reduce<
      Record<number, (typeof efficientNotice.additionalContents)[number]>
    >(
      (prev, curr) => ({
        ...prev,
        [curr.id]: prev[curr.id]?.lang === i18n.language ? prev[curr.id] : curr,
      }),
      {},
    ),
  );

  const isOwner = user?.uuid === efficientNotice.author.uuid;

  return (
    <NoticeDetail.Root>
      {/* DESKTOP — image stack as sidebar */}
      <div className="hidden md:block">
        <NoticeDetail.ImageStack
          sources={efficientNotice.imageUrls}
          alt={efficientNotice.title}
        />
      </div>

      <NoticeDetail.Body>
        <SendPushAlarm {...efficientNotice} />

        <NoticeDetail.Deadline deadline={efficientNotice.currentDeadline} />
        <NoticeDetail.Metadata
          author={efficientNotice.author}
          createdAt={efficientNotice.createdAt}
        />
        {isOwner && (
          <NoticeDetail.AuthorActions noticeId={efficientNotice.id} />
        )}
        <NoticeDetail.Title>{efficientNotice.title}</NoticeDetail.Title>
        <NoticeDetail.Tags tags={efficientNotice.tags} />
        <NoticeDetail.DocumentUrls
          crawledUrl={efficientNotice.crawledUrl}
          documents={efficientNotice.documents}
        />

        {/* MOBILE — image stack inline */}
        <div className="md:hidden">
          <NoticeDetail.ImageStack
            width={900}
            sources={efficientNotice.imageUrls}
            alt={efficientNotice.title}
          />
        </div>

        <NoticeDetail.Content content={efficientNotice.content} />
        <NoticeDetail.Actions
          id={efficientNotice.id}
          title={efficientNotice.title}
          reactions={efficientNotice.reactions}
        />
        <NoticeDetail.AdditionalNotices
          additionalContents={additionalContents}
          originalDeadline={efficientNotice.deadline}
        />
      </NoticeDetail.Body>
    </NoticeDetail.Root>
  );
}
