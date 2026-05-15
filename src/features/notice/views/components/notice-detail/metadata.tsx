import dayjs from 'dayjs';

import { Avatar } from '@/common/components';
import type { Author } from '@/features/notice/models';

interface NoticeDetailMetadataProps {
  author: Author;
  createdAt: string;
}

export const NoticeDetailMetadata = ({
  author,
  createdAt,
}: NoticeDetailMetadataProps) => {
  const timeAgo = dayjs(createdAt).fromNow();
  return (
    <div className="flex items-center">
      <Avatar
        name={author.name}
        picture={author.picture}
        imageClassName="size-9"
        className="gap-2"
        labelClassName="text-lg"
      />
      <span className="text-greyDark mx-1.25 font-bold">·</span>
      <span className="text-greyDark font-medium">{timeAgo}</span>
    </div>
  );
};
