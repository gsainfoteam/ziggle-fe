import { createTranslation, PropsWithLng } from '@/app/i18next';

import Tag from '../../molecules/Tag';

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
    <div className={`flex gap-[7px] ${className ?? ''}`}>
      {tags.map((name, i) => (
        <Tag
          key={name}
          lng={lng}
          name={`${isDefaultTag(name) ? t(`notices.${name}.name`) : name}`}
        />
      ))}
    </div>
  );
};

export default Tags;
