import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { getGroup } from '@/api/group/group';
import { Notice } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';
import DefaultProfile from '@/assets/icons/default-profile.svg';

import DDay from './DDay';
import ZaboActions from './ZaboActions';
import ZaboImageCarousel from './ZaboImageCarousel';
import ZaboTags from './ZaboTags';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
    ? { height: number; width?: never }
    : never;

export type ZaboProps = Notice & {
  width?: number;
  height?: number; // migration ongoing | remove after migration complete
  // mockGroupInfo?: { name: string; profileImageUrl?: string } | null;
};

const Zabo = async (props: ZaboProps & PropsWithLng) => {
  const {
    content,
    createdAt,
    author,
    deadline,
    reactions,
    title,
    imageUrls,
    tags,
    lng,
    id,
    groupId,
    // mockGroupInfo,
  } = props;
  const timeAgo = dayjs(createdAt).fromNow();

  const groupInfo = groupId ? await getGroup(groupId) : null;
  // const groupInfo =
  //   mockGroupInfo !== undefined
  //     ? mockGroupInfo
  //     : groupId
  //       ? await getGroup(groupId)
  //       : null;

  const hasImage = imageUrls.length > 0;
  const hasContent = content.trim().length > 0;
  const hasTags = tags.length > 0;

  return (
    <Link href={`/${lng}/notice/${id}`}>
      <div
        className={
          'flex flex-col rounded-[10px] pt-2.5 text-text transition hover:bg-greyLight dark:hover:bg-dark_greyDark'
        }
      >
        <div className={'mx-3 my-2.5 flex flex-wrap items-center gap-y-3'}>
          {groupInfo?.profileImageUrl ? (
            <Image
              src={groupInfo.profileImageUrl}
              width={36}
              height={36}
              alt={groupInfo.name}
              className={'rounded-full'}
            />
          ) : (
            <DefaultProfile width={36} height={36} />
          )}
          <span className={'ml-2 text-lg font-medium dark:text-dark_white'}>
            {groupInfo ? groupInfo.name : author.name}
          </span>

          <span className={'mx-[5px] font-bold text-greyDark dark:text-grey'}>
            ·
          </span>

          <span className={'font-medium text-greyDark dark:text-grey'}>
            {timeAgo}
          </span>

          {deadline !== null && (
            <>
              <div className="w-[15px]" />
              <DDay deadline={dayjs(deadline)} lng={lng} />
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2.5 px-4 pb-2.5">
          <p
            className={
              'line-clamp-3 text-xl font-semibold dark:text-dark_white'
            }
          >
            {title}
          </p>

          {hasImage && (
            <ZaboImageCarousel imageUrls={imageUrls} title={title} />
          )}

          {hasTags && <ZaboTags notice={props} />}

          {hasContent && (
            <div className={'line-clamp-3 w-full text-lg dark:text-dark_white'}>
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

export default Zabo;
