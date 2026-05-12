import { Tags as NoticeListTags } from '../notice-list/tags';

interface NoticeDetailTagsProps {
  tags: string[];
}

export const NoticeDetailTags = ({ tags }: NoticeDetailTagsProps) => {
  if (tags.length === 0) return null;
  return <NoticeListTags tags={tags} className="flex-wrap" />;
};
