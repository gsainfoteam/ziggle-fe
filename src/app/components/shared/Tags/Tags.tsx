import { createTranslation, PropsWithLng } from '@/app/i18next';

import Tag from './Tag';

const defaultTags = ['event', 'general', 'recruit', 'academic'] as const;

const isDefaultTag = (tag: string): tag is (typeof defaultTags)[number] =>
  defaultTags.includes(tag as never);

interface TagsProps {
  tags: string[];
  className?: string;
}

const Tags = async ({ tags, className, lng }: PropsWithLng<TagsProps>) => {
  const { t } = await createTranslation(lng);
  return (
    <div className={`flex gap-[7px] ${className ?? ''}`}>
      {tags.map((name) => (
        <Tag
          key={name}
          name={`${isDefaultTag(name) ? t(`notices.${name}.name`) : name}`}
        />
      ))}
    </div>
  );
};

export default Tags;
