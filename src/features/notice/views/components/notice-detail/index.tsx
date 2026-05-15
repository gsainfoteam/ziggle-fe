import { NoticeDetailActions } from './actions';
import { NoticeDetailAdditionalNotices } from './additional-notices';
import { NoticeDetailAuthorActions } from './author-actions';
import { NoticeDetailBody } from './body';
import { NoticeDetailContent } from './content';
import { NoticeDetailDeadline } from './deadline';
import { NoticeDetailDocumentUrls } from './document-urls';
import { NoticeDetailImageStack } from './image-stack';
import { NoticeDetailMetadata } from './metadata';
import { NoticeDetailRoot } from './root';
import { NoticeDetailTags } from './tags';
import { NoticeDetailTitle } from './title';

export const NoticeDetail = {
  Root: NoticeDetailRoot,
  Body: NoticeDetailBody,
  Deadline: NoticeDetailDeadline,
  Metadata: NoticeDetailMetadata,
  Title: NoticeDetailTitle,
  Tags: NoticeDetailTags,
  AuthorActions: NoticeDetailAuthorActions,
  DocumentUrls: NoticeDetailDocumentUrls,
  ImageStack: NoticeDetailImageStack,
  Content: NoticeDetailContent,
  Actions: NoticeDetailActions,
  AdditionalNotices: NoticeDetailAdditionalNotices,
};
