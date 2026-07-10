import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Eye } from 'iconoir-react';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import type { Notice } from '@/features/notice/models';

import { NoticeCardActions } from './actions';
import { NoticeCardAttachmentIndicators } from './attachment-indicators';
import { NoticeCardContent } from './content';
import { NoticeCardDDay } from './d-day';
import { NoticeCardHighlightedText } from './highlighted-text';
import { NoticeCardImageCarousel } from './image-carousel';
import { NoticeCardTags } from './tags';
import { NoticeCardTitle } from './title';

interface NoticeCardProps {
  notice: Notice;
  searchQuery?: string;
}

type HeaderProps = Pick<
  NoticeCardProps['notice'],
  'author' | 'createdAt' | 'views' | 'deadline'
> &
  Pick<NoticeCardProps, 'searchQuery'>;

const Header = ({
  author,
  createdAt,
  views,
  deadline,
  searchQuery,
}: HeaderProps) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex min-w-0 items-center gap-2">
      {author.picture ? (
        <img
          src={author.picture}
          alt={author.name}
          className="size-8 shrink-0 rounded-full"
        />
      ) : (
        <DefaultProfile className="size-8 shrink-0" />
      )}
      <span className="text-text dark:text-dark_white truncate text-base font-semibold">
        {searchQuery ? (
          <NoticeCardHighlightedText query={searchQuery}>
            {author.name}
          </NoticeCardHighlightedText>
        ) : (
          author.name
        )}
      </span>
      <span className="text-greyDark dark:text-dark_grey shrink-0 text-base">
        {dayjs(createdAt).fromNow()}
      </span>
      <span className="text-greyDark dark:text-dark_grey flex shrink-0 items-center gap-1 text-base">
        <Eye className="size-3.5" strokeWidth={2.5} />
        {views}
      </span>
    </div>
    {deadline && (
      <NoticeCardDDay deadline={dayjs(deadline)} className="shrink-0" />
    )}
  </div>
);

type BodyProps = Pick<
  NoticeCardProps['notice'],
  'title' | 'content' | 'tags' | 'imageUrls' | 'documents' | 'isViewed'
> &
  Pick<NoticeCardProps, 'searchQuery'>;

const Body = ({
  title,
  content,
  tags,
  imageUrls,
  documents,
  isViewed,
  searchQuery,
}: BodyProps) => (
  <div className="flex items-stretch gap-3">
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex flex-col gap-1">
        <NoticeCardTitle isRead={isViewed} query={searchQuery}>
          {title}
        </NoticeCardTitle>
        <NoticeCardAttachmentIndicators documents={documents} />
      </div>
      <div className="flex-1">
        <NoticeCardContent query={searchQuery}>{content}</NoticeCardContent>
      </div>
      <NoticeCardTags tags={tags} />
    </div>
    <NoticeCardImageCarousel imageUrls={imageUrls} title={title} />
  </div>
);

type FooterProps = Pick<
  NoticeCardProps['notice'],
  'id' | 'title' | 'reactions' | 'isBookmarked'
>;

const Footer = ({ id, title, reactions, isBookmarked }: FooterProps) => (
  <div className="">
    <NoticeCardActions
      id={id}
      title={title}
      reactions={reactions}
      isBookmarked={isBookmarked}
    />
  </div>
);

export const NoticeCard = ({ notice, searchQuery }: NoticeCardProps) => (
  <Link to="/notice/$id" params={{ id: notice.id.toString() }}>
    <div className="text-text flex flex-col gap-3">
      <Header
        author={notice.author}
        createdAt={notice.createdAt}
        views={notice.views}
        deadline={notice.deadline}
        searchQuery={searchQuery}
      />
      <Body
        title={notice.title}
        content={notice.content}
        tags={notice.tags}
        imageUrls={notice.imageUrls}
        documents={notice.documents}
        isViewed={notice.isViewed}
        searchQuery={searchQuery}
      />
      <Footer
        id={notice.id}
        title={notice.title}
        reactions={notice.reactions}
        isBookmarked={notice.isBookmarked}
      />
    </div>
  </Link>
);
