import { useParams } from '@tanstack/react-router';

import { useNoticeNav } from '../components/layout/use-notice-nav';
import { NoticeListColumn } from '../components/notice-list/notice-list-column';

export function NoticeCategoryFrame() {
  const { category } = useParams({ from: '/_layout/$category' });
  return <NoticeListColumn item={useNoticeNav().categories[category]} />;
}
