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
  const { numId } = useLoaderData({
    from: '/_layout/notice/$id',
  });
  const { data: notice, isLoading, isError, isNotFound } = useNotice(numId);
  const { t: commonT, i18n } = useTranslation('common');
  const { t: noticeT } = useTranslation('notice');
  const { data: user } = useUser();

  useEffect(() => {
    if (!notice) return;
    document.title = notice.title;
    return () => {
      document.title = commonT('app_name');
    };
  }, [notice?.title, commonT]);

  if (isNotFound) {
    return <NoticeNotFoundFrame />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !notice) {
    return (
      <PanelShell>
        <p
          className="text-muted-foreground py-12 text-center text-sm"
          role="alert"
        >
          {noticeT('query_handle.fetch_fail')}
        </p>
      </PanelShell>
    );
  }

  const additionalContents = Object.values(
    notice.additionalContents.reduce<
      Record<number, (typeof notice.additionalContents)[number]>
    >(
      (prev, curr) => ({
        ...prev,
        [curr.id]: prev[curr.id]?.lang === i18n.language ? prev[curr.id] : curr,
      }),
      {},
    ),
  );

  const isOwner = user?.uuid === notice.author.uuid;

  return (
    <NoticeDetailActionsProvider
      id={notice.id}
      title={notice.title}
      reactions={notice.reactions}
      isBookmarked={notice.isBookmarked}
    >
      <PanelShell
        leading={<NoticeDetailBackButton noticeId={notice.id} />}
        aside={<NoticeDetailActions variant="rail" />}
        // 모바일에서 sticky Navbar pb와 섹션 pt 중복 방지. 스크롤 시 헤더 pb는 유지.
        className="pt-0 md:pt-5"
      >
        <SendPushAlarm {...notice} />
        <NoticeDetail
          notice={notice}
          isOwner={isOwner}
          additionalContents={additionalContents}
        />
      </PanelShell>
    </NoticeDetailActionsProvider>
  );
}
