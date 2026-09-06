import { useParams } from '@tanstack/react-router';

import { useNoticeNav } from '../components/layout/use-notice-nav';
import { Panel } from '../components/notice-list/panel';

export function NoticeCategoryFrame() {
  const { category } = useParams({ from: '/_layout/$category' });
  return <Panel item={useNoticeNav().categories[category]} />;
}
