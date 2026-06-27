import { useNoticeNav } from '../components/layout/use-notice-nav';
import { NoticeListColumn } from '../components/notice-list/notice-list-column';

export const RecentFrame = () => (
  <NoticeListColumn item={useNoticeNav().feeds.recent} />
);
export const DeadlineFrame = () => (
  <NoticeListColumn item={useNoticeNav().feeds.deadline} />
);
export const PopularFrame = () => (
  <NoticeListColumn item={useNoticeNav().feeds.popular} />
);
export const MyFrame = () => (
  <NoticeListColumn item={useNoticeNav().feeds.my} />
);
export const RemindedFrame = () => (
  <NoticeListColumn item={useNoticeNav().feeds.reminded} />
);
