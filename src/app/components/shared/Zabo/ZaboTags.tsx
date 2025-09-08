import { Notice } from '@/api/notice/notice';

import Tag from '../Tags/Tag';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={'flex flex-wrap gap-2'}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};

export default ZaboTags;
