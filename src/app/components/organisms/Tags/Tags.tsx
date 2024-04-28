import { createTranslation, PropsWithLng } from '@/app/i18next';

import Chip from '../../molecules/Chip';

const defaultTags = ['event', 'general', 'recruit', 'academic'] as const;

const isDefaultTag = (tag: string): tag is (typeof defaultTags)[number] =>
  defaultTags.includes(tag as never);

const Tags = async ({
  tags,
  className,
  searchQuery,
  lng,
}: PropsWithLng<{
  tags: string[];
  className?: string;
  searchQuery?: string;
}>) => {
  const { t } = await createTranslation(lng);
  return (
    <div className={`flex gap-2 ${className ?? ''}`}>
      {tags.map((name, i) => (
        <Chip
          key={name}
          className="font-normal"
          variant={name === searchQuery ? 'selected' : undefined}
        >{`#${isDefaultTag(name) ? t(`notices.${name}.name`) : name}`}</Chip>
      ))}
    </div>
  );
};

export default Tags;
