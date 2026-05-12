import { Tag } from '../tags';

interface NoticeCardTagsProps {
  tags: string[];
}

export const NoticeCardTags = ({ tags }: NoticeCardTagsProps) => {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};
