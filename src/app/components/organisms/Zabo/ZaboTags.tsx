import Link from 'next/link';

import { Notice } from '@/api/notice/notice';

import Tag from '../../molecules/Tag';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={'mx-3 flex gap-[5px]'}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};

export default ZaboTags;
