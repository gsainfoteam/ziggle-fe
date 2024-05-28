import { Notice } from '@/api/notice/notice';

import Tag from '../../molecules/Tag';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={'mx-3 flex flex-wrap gap-[5px]'}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};

export default ZaboTags;
