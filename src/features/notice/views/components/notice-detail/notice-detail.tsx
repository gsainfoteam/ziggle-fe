import { useRouter } from '@tanstack/react-router';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import type {
  AdditionalContent,
  NoticeDetail as NoticeDetailModel,
} from '@/features/notice/models';

import { NoticeDetailActions } from './actions';
import { NoticeDetailAdditionalNotices } from './additional-notices';
import { NoticeDetailAuthorActions } from './author-actions';
import { NoticeDetailContent } from './content';
import { NoticeDetailImageStack } from './image-stack';
import { NoticeDetailMetadata } from './metadata';
import { Tags } from '../notice-list/tags';

export interface NoticeDetailProps {
  notice: NoticeDetailModel;
  isOwner?: boolean;
  additionalContents?: AdditionalContent[];
}

export function NoticeDetailBackButton({ noticeId }: { noticeId: number }) {
  const { t } = useTranslation('notice');
  const router = useRouter();

  return (
    <LogClick
      eventName={LogEvents.detailClickBack}
      properties={{ id: noticeId }}
    >
      <button
        type="button"
        aria-label={t('detail.back')}
        onClick={() => {
          if (router.history.canGoBack()) {
            router.history.back();
          } else {
            void router.navigate({ to: '/home' });
          }
        }}
        className="border-border text-foreground hover:bg-muted bg-background flex size-10 shrink-0 items-center justify-center rounded-xl border transition"
      >
        <ArrowLeftIcon weight="bold" className="size-5" />
      </button>
    </LogClick>
  );
}

type HeaderProps = Pick<NoticeDetailProps['notice'], 'author'> & {
  noticeId: number;
};

const Header = ({ noticeId, author }: HeaderProps) => (
  <div className="flex min-w-0 items-center gap-2">
    <div className="md:hidden">
      <NoticeDetailBackButton noticeId={noticeId} />
    </div>
    {author.picture ? (
      <img
        src={author.picture}
        alt={author.name}
        className="size-9 shrink-0 rounded-full"
      />
    ) : (
      <DefaultProfile className="size-9 shrink-0" />
    )}
    <span className="text-foreground truncate text-lg font-semibold">
      {author.name}
    </span>
  </div>
);

type BodyProps = Pick<
  NoticeDetailProps['notice'],
  | 'title'
  | 'tags'
  | 'createdAt'
  | 'views'
  | 'currentDeadline'
  | 'crawledUrl'
  | 'documents'
  | 'imageUrls'
  | 'content'
>;

const Body = ({
  title,
  tags,
  createdAt,
  views,
  currentDeadline,
  crawledUrl,
  documents,
  imageUrls,
  content,
}: BodyProps) => (
  <div className="flex flex-col gap-4">
    <h1 className="text-foreground text-[25px] leading-tight font-semibold">
      {title}
    </h1>
    {tags.length > 0 && <Tags tags={tags} className="flex-wrap gap-1.75" />}
    <NoticeDetailMetadata
      createdAt={createdAt}
      views={views}
      currentDeadline={currentDeadline}
      crawledUrl={crawledUrl}
      documents={documents}
    />
    <NoticeDetailImageStack sources={imageUrls} alt={title} />
    <NoticeDetailContent content={content} />
  </div>
);

export const NoticeDetail = ({
  notice,
  isOwner = false,
  additionalContents = [],
}: NoticeDetailProps) => (
  <div className="mx-auto flex w-full max-w-200 flex-col gap-6">
    <Header noticeId={notice.id} author={notice.author} />
    {isOwner && <NoticeDetailAuthorActions noticeId={notice.id} />}
    <Body
      title={notice.title}
      tags={notice.tags}
      createdAt={notice.createdAt}
      views={notice.views}
      currentDeadline={notice.currentDeadline}
      crawledUrl={notice.crawledUrl}
      documents={notice.documents}
      imageUrls={notice.imageUrls}
      content={notice.content}
    />
    <NoticeDetailActions className="md:hidden" />
    {additionalContents.length > 0 && (
      <NoticeDetailAdditionalNotices
        additionalContents={additionalContents}
        originalDeadline={notice.deadline}
      />
    )}
  </div>
);
