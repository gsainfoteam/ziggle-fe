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
    <div className={cn('flex gap-[7px]', className)}>
      {tags.map((name) => (
        <Tag
          key={name}
          // t('notices.event.name')
          // t('notices.general.name')
          // t('notices.recruit.name')
          // t('notices.academic.name')
          name={`${isDefaultTag(name) ? t(`notices.${name}.name`) : name}`}
        />
      ))}
    </div>
  );
};
