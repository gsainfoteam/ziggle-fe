import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { Tag } from './tag';

const defaultTags = ['event', 'general', 'recruit', 'academic'] as const;

const isDefaultTag = (tag: string): tag is (typeof defaultTags)[number] =>
  defaultTags.includes(tag as never);

interface TagsProps {
  tags: string[];
  className?: string;
}

export const Tags = ({ tags, className }: TagsProps) => {
  const { t } = useTranslation('notice');
  return (
    <div className={cn('flex gap-1.75', className)}>
      {tags.map((name) => (
        <Tag
          key={name}
          // t('list.categories.event.name')
          // t('list.categories.general.name')
          // t('list.categories.recruit.name')
          // t('list.categories.academic.name')
          name={`${isDefaultTag(name) ? t(`list.categories.${name}.name`) : name}`}
        />
      ))}
    </div>
  );
};
