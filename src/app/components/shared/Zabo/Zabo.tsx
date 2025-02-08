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
};

const Zabo = async (props: ZaboProps & PropsWithLng) => {
  const {
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
  } = props;
  const timeAgo = dayjs(createdAt).fromNow();

  const hasImage = imageUrls.length > 0;

  const groupInfo = groupId ? await getGroup(groupId) : null;

  return (
    <Link href={`/${lng}/notice/${id}`}>
      <div
        className={
          'flex flex-col rounded-[10px] py-[10px] text-text transition hover:bg-greyLight dark:hover:bg-dark_greyDark'
        }
      >
        <div className={'mx-3 my-[10px] flex flex-wrap items-center gap-y-3'}>
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

        <p
          className={
            'mx-4 mb-[10px] line-clamp-3 text-xl font-semibold dark:text-dark_white'
          }
        >
          {title}
        </p>

        {!hasImage && <ZaboTags notice={props} />}

        {hasImage && <ZaboImageCarousel imageUrls={imageUrls} title={title} />}

        {hasImage && (
          <div className="mx-2 my-4">
            <ZaboActions {...props} />
          </div>
        )}

        {hasImage && <ZaboTags notice={props} />}

        <div
          className={'mx-4 mt-[10px] line-clamp-3 text-lg dark:text-dark_white'}
        >
          {props.content}
        </div>

        {!hasImage && (
          <div className="mx-2 mt-4">
            <ZaboActions {...props} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Zabo;
