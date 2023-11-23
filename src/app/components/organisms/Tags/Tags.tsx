import { Tag } from '@/api/notice/notice';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import Chip from '../../molecules/Chip';

const Tags = async ({
  tags,
  className,
  searchQuery,
  lng,
}: PropsWithLng<{
  tags: Tag[];
  className?: string;
  searchQuery?: string;
}>) => {
  const { t } = await createTranslation(lng);
  return (
    <div className={`flex gap-2 ${className ?? ''}`}>
      {tags.map((tag, i) => (
        <Chip
          key={i}
          className="font-normal"
          variant={tag.name === searchQuery ? 'contained' : undefined}
        >{`#${
          tag.id <= 4
            ? t(
                `notices.${
                  tag.name as 'event' | 'general' | 'recruit' | 'academic'
                }.name`,
              )
            : tag.name
        }`}</Chip>
      ))}
    </div>
  );
};

export default Tags;
