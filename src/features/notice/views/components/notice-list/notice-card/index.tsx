import { NoticeCardActions } from './actions';
import { NoticeCardAttachmentIndicators } from './attachment-indicators';
import { NoticeCardBody } from './body';
import { NoticeCardContent } from './content';
import { NoticeCardDDay } from './d-day';
import { NoticeCardHeader } from './header';
import { NoticeCardHighlightedText } from './highlighted-text';
import { NoticeCardImageCarousel } from './image-carousel';
import { NoticeCardRoot } from './root';
import { NoticeCardSkeleton } from './skeleton';
import { NoticeCardTags } from './tags';
import { NoticeCardTitle } from './title';

export const NoticeCard = {
  Root: NoticeCardRoot,
  Header: NoticeCardHeader,
  Body: NoticeCardBody,
  Title: NoticeCardTitle,
  Content: NoticeCardContent,
  DDay: NoticeCardDDay,
  Tags: NoticeCardTags,
  Actions: NoticeCardActions,
  ImageCarousel: NoticeCardImageCarousel,
  HighlightedText: NoticeCardHighlightedText,
  AttachmentIndicators: NoticeCardAttachmentIndicators,
  Skeleton: NoticeCardSkeleton,
};
