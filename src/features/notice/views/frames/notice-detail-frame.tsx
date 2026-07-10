import { useEffect } from 'react';

import { useLoaderData } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NoticeNotFoundFrame } from './notice-not-found-frame';
import { useNotice } from '../../viewmodels';
import { PanelShell } from '../components/layout/panel-shell';
import { SendPushAlarm } from '../components/modals/send-push-notification';
import {
  NoticeDetail,
  NoticeDetailBackButton,
} from '../components/notice-detail';
import {
  NoticeDetailActions,
  NoticeDetailActionsProvider,
} from '../components/notice-detail/actions';

export function NoticeDetailFrame() {
  const { notice: preloadedNotice, numId } = useLoaderData({
    from: '/_layout/notice/$id',
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
    <NoticeDetailActionsProvider
      id={efficientNotice.id}
      title={efficientNotice.title}
      reactions={efficientNotice.reactions}
      isBookmarked={efficientNotice.isBookmarked}
    >
      <PanelShell
        leading={<NoticeDetailBackButton noticeId={efficientNotice.id} />}
        aside={<NoticeDetailActions variant="rail" />}
      >
        <SendPushAlarm {...efficientNotice} />
        <NoticeDetail
          notice={efficientNotice}
          isOwner={isOwner}
          additionalContents={additionalContents}
        />
      </PanelShell>
    </NoticeDetailActionsProvider>
  );
}
