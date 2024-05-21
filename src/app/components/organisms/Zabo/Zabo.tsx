import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { Notice } from '@/api/notice/notice';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';
import DefaultProfile from '@/assets/default-profile.svg';

import DDay from '../../molecules/DDay';
import ZaboActions from './ZaboActions';
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
  } = props;
  const timeAgo = dayjs(createdAt).fromNow();

  const { t } = await createTranslation(lng);

  const hasImage = imageUrls.length > 0;

  return (
    <Link href={`/${lng}/notice/${id}`}>
      <div
        className={
          'flex flex-col rounded-[10px] py-[10px] text-text transition hover:bg-greyLight dark:hover:bg-dark_greyDark'
        }
      >
        <div className={'mx-3 my-[10px] flex items-center'}>
          <DefaultProfile width={36} height={36} />

          <p className={'ml-2 text-lg font-medium dark:text-dark_white'}>
            {author.name}
          </p>

          <p className={'mx-[5px] font-bold text-greyDark dark:text-grey'}>·</p>

          <p className={'font-medium text-greyDark dark:text-grey'}>
            {timeAgo}
          </p>

          {deadline !== null && (
            <DDay className="ml-[15px]" deadline={dayjs(deadline)} t={t} />
          )}
        </div>

        <p
          className={
            'mx-4 mb-[10px] text-xl font-semibold dark:text-dark_white'
          }
        >
          {title}
        </p>

        {!hasImage && <ZaboTags notice={props} lng={lng} />}

        {hasImage && (
          <div className={'flex justify-center'}>
            {/* // 아래 div에 바로 justify-center를 적용하면, 1번 2번 이미지가 잘려서
          보임 */}
            <div className={'flex flex-nowrap gap-[10px] overflow-x-scroll'}>
              {imageUrls.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt={title}
                  width={200}
                  height={200}
                  className={
                    'rounded-[5px] border border-gray-300 object-cover'
                  }
                />
              ))}
            </div>
          </div>
        )}

        {hasImage && (
          <div className="mx-2 my-4">
            <ZaboActions {...props} />
          </div>
        )}

        {hasImage && <ZaboTags notice={props} lng={lng} />}

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
