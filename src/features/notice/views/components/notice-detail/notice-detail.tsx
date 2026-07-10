import { useRouter } from '@tanstack/react-router';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { Eye } from 'iconoir-react';
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
import { NoticeDetailDocumentUrls } from './document-urls';
import { NoticeDetailImageStack } from './image-stack';
import { Tags } from '../notice-list/tags';

export interface NoticeDetailProps {
  notice: NoticeDetailModel;
  isOwner?: boolean;
  additionalContents?: AdditionalContent[];
}

function BackButton({ noticeId }: { noticeId: number }) {
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
        className="text-text dark:text-dark_white hover:bg-greyLight dark:hover:bg-dark_greyDark -ml-2 flex size-9 items-center justify-center rounded-full transition"
      >
        <ArrowLeftIcon weight="bold" className="size-5" />
      </button>
    </LogClick>
  );
}

type HeaderProps = Pick<
  NoticeDetailProps['notice'],
  'author' | 'createdAt' | 'views' | 'currentDeadline'
>;

const Header = ({ author, createdAt, views, currentDeadline }: HeaderProps) => {
  const { t } = useTranslation('notice');
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {author.picture ? (
          <img
            src={author.picture}
            alt={author.name}
            className="size-9 shrink-0 rounded-full"
          />
        ) : (
          <DefaultProfile className="size-9 shrink-0" />
        )}
        <span className="text-text dark:text-dark_white truncate text-lg">
          {author.name}
        </span>
        <span className="text-greyDark dark:text-grey font-bold">·</span>
        <span className="text-greyDark dark:text-grey shrink-0 text-base font-medium">
          {dayjs(createdAt).fromNow()}
        </span>
        <span className="text-greyDark dark:text-grey font-bold">·</span>
        <span className="text-greyDark dark:text-grey flex shrink-0 items-center gap-1 text-base font-medium">
          <Eye className="size-4" strokeWidth={2.5} />
          {views}
        </span>
      </div>
      {currentDeadline && (
        <div className="bg-primary shrink-0 rounded px-3 py-1 text-sm font-semibold text-white">
          {t('detail.due_at', {
            dueAt: dayjs(currentDeadline).tz().format('YYYY.MM.DD. HH:mm'),
          })}
        </div>
      )}
    </div>
  );
};

type BodyProps = Pick<
  NoticeDetailProps['notice'],
  'title' | 'tags' | 'crawledUrl' | 'documents' | 'imageUrls' | 'content'
>;

const Body = ({
  title,
  tags,
  crawledUrl,
  documents,
  imageUrls,
  content,
}: BodyProps) => (
  <div className="flex flex-col gap-4">
    <h1 className="text-text dark:text-dark_white text-[25px] leading-tight font-semibold">
      {title}
    </h1>
    {tags.length > 0 && <Tags tags={tags} className="flex-wrap gap-1.75" />}
    <NoticeDetailDocumentUrls crawledUrl={crawledUrl} documents={documents} />
    <NoticeDetailImageStack sources={imageUrls} alt={title} />
    <NoticeDetailContent content={content} />
  </div>
);

type FooterProps = Pick<
  NoticeDetailProps['notice'],
  'id' | 'title' | 'reactions' | 'isBookmarked'
>;

const Footer = ({ id, title, reactions, isBookmarked }: FooterProps) => (
  <div className="flex flex-col gap-3">
    <NoticeDetailActions
      id={id}
      title={title}
      reactions={reactions}
      isBookmarked={isBookmarked}
    />
  </div>
);

export const NoticeDetail = ({
  notice,
  isOwner = false,
  additionalContents = [],
}: NoticeDetailProps) => (
  <div className="mx-auto flex w-full max-w-200 flex-col gap-6 p-4">
    <div className="flex flex-col gap-4">
      <BackButton noticeId={notice.id} />
      <Header
        author={notice.author}
        createdAt={notice.createdAt}
        views={notice.views}
        currentDeadline={notice.currentDeadline}
      />
    </div>
    {isOwner && <NoticeDetailAuthorActions noticeId={notice.id} />}
    <Body
      title={notice.title}
      tags={notice.tags}
      crawledUrl={notice.crawledUrl}
      documents={notice.documents}
      imageUrls={notice.imageUrls}
      content={notice.content}
    />
    <Footer
      id={notice.id}
      title={notice.title}
      reactions={notice.reactions}
      isBookmarked={notice.isBookmarked}
    />
    {additionalContents.length > 0 && (
      <NoticeDetailAdditionalNotices
        additionalContents={additionalContents}
        originalDeadline={notice.deadline}
      />
    )}
  </div>
);
