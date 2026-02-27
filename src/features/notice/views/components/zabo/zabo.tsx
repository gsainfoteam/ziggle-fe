import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import type { Notice } from '@/features/notice/models';

import DDay from './d-day';
import { ZaboActions } from './zabo-actions';
import { ZaboImageCarousel } from './zabo-image-carousel';
import ZaboTags from './zabo-tags';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
    ? { height: number; width?: never }
    : never;

export type ZaboProps = Notice & {
  width?: number;
  height?: number; // migration ongoing | remove after migration complete
};

export const Zabo = (props: ZaboProps) => {
  const {
    content,
    createdAt,
    author,
    deadline,
    title,
    imageUrls,
    tags,
    id,
    group,
  } = props;
  const timeAgo = dayjs(createdAt).fromNow();

  const hasImage = imageUrls.length > 0;
  const hasContent = content.trim().length > 0;
  const hasTags = tags.length > 0;

  return (
    <Link to="/notice/$id" params={{ id: id.toString() }}>
      <div className="text-text hover:bg-greyLight dark:hover:bg-dark_greyDark flex flex-col rounded-[10px] pt-2.5 transition">
        <div className="mx-3 my-2.5 flex flex-wrap items-center gap-y-3">
          {group?.profileImageUrl ? (
            <img
              src={group.profileImageUrl}
              width={36}
              height={36}
              alt={group.name}
              className="rounded-full"
            />
          ) : (
            <DefaultProfile className="h-9 w-9" />
          )}
          <span className="dark:text-dark_white ml-2 text-lg font-medium">
            {group ? group.name : author.name}
          </span>

          <span className="text-greyDark dark:text-grey mx-[5px] font-bold">
            ·
          </span>

          <span className="text-greyDark dark:text-grey font-medium">
            {timeAgo}
          </span>

          {deadline !== null && (
            <>
              <div className="w-[15px]" />
              <DDay deadline={dayjs(deadline)} />
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2.5 px-4 pb-2.5">
          <p className="dark:text-dark_white line-clamp-3 text-xl font-semibold">
            {title}
          </p>

          {hasImage && (
            <ZaboImageCarousel imageUrls={imageUrls} title={title} />
          )}

          {hasTags && <ZaboTags notice={props} />}

          {hasContent && (
            <div className="dark:text-dark_white line-clamp-3 w-full text-lg">
              {content}
            </div>
          )}
        </div>

        <div className="mx-3 my-2.5">
          <ZaboActions {...props} />
        </div>
      </div>
    </Link>
  );
};
