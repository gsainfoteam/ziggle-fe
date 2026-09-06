import { useNoticeNav } from '../components/layout/use-notice-nav';
import { Panel } from '../components/notice-list/panel';

export const RecentFrame = () => <Panel item={useNoticeNav().feeds.recent} />;
export const DeadlineFrame = () => (
  <Panel item={useNoticeNav().feeds.deadline} />
);
export const PopularFrame = () => <Panel item={useNoticeNav().feeds.popular} />;
export const MyFrame = () => <Panel item={useNoticeNav().feeds.my} />;
export const BookmarkedFrame = () => (
  <Panel item={useNoticeNav().feeds.bookmarked} />
);
