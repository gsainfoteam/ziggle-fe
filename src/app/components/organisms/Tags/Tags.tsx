import { Tag } from '@/api/notice/notice';

import Chip from '../../molecules/Chip';

const Tags = ({
  tags,
  className,
  searchQuery,
}: {
  tags: Tag[];
  className?: string;
  searchQuery?: string;
}) => (
  <div className={`flex gap-2 ${className ?? ''}`}>
    {tags.map((tag, i) => (
      <Chip
        key={i}
        className="font-normal"
        variant={tag.name === searchQuery ? 'contained' : undefined}
      >{`#${tag.name}`}</Chip>
    ))}
  </div>
);

export default Tags;
