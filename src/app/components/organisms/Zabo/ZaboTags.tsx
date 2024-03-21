import Link from 'next/link';

import { Notice } from '@/api/notice/notice';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={'mx-3 flex gap-[5px]'}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/section/${tag}`}
          className={'rounded-[5px] bg-secondary px-2 py-1 text-primary'}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};

export default ZaboTags;
