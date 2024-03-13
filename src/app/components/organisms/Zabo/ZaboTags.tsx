import { Notice } from '@/api/notice/notice';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags } }: ZaboTagsProps) => {
  return (
    <div className={'mx-3 flex gap-[5px]'}>
      {tags.map((tag) => (
        <a
          key={tag}
          href={`/section/${tag}`}
          className={'rounded-[5px] bg-secondary px-2 py-1 text-primary'}
        >
          #{tag}
        </a>
      ))}
    </div>
  );
};

export default ZaboTags;
