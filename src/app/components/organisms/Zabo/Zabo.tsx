import dayjs from 'dayjs';
import Image from 'next/image';

import { Notice } from '@/api/notice/notice';
import { PropsWithLng, PropsWithT } from '@/app/i18next';
import DefaultProfile from '@/assets/default-profile.jpeg';

import DDay from '../../molecules/DDay';
import ZaboActions from './ZaboActions';
import ZaboTags from './ZaboTags';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
    ? { height: number; width?: never }
    : never;

export type ZaboProps = PropsWithT<Notice> & {
  width?: number;
  height?: number; // migration ongoing | remove after migration complete
};

const Zabo = (props: ZaboProps & PropsWithLng) => {
  const { createdAt, author, deadline, reactions, t, title, imageUrls, tags } =
    props;
  const timeAgo = dayjs(createdAt).fromNow();

  const hasImage = imageUrls.length > 0;

  return (
    <div className={'flex flex-col text-text'}>
      <div className={'mx-3 my-[10px] flex items-center'}>
        <Image src={DefaultProfile} alt={author.name} width={36} height={36} />

        <p className={'ml-2 text-lg font-medium'}>{author.name}</p>

        <p className={'mx-[5px] font-bold text-[#6E6E73]'}>·</p>

        <p className={'font-medium text-[#6E6E73]'}>{timeAgo}</p>

        {deadline !== null ?? <DDay deadline={dayjs(deadline)} t={t} />}
      </div>

      <p className={'mx-4 mb-[10px] text-xl font-semibold'}>{title}</p>

      {!hasImage && <ZaboTags notice={props} />}

      {hasImage && (
        <div className={'flex justify-center gap-[10px] overflow-x-scroll'}>
          {imageUrls.map((url) => (
            <Image
              key={url}
              src={url}
              alt={title}
              width={200}
              height={200}
              className={
                'h-[200px] w-[200px] rounded-[5px] border border-gray-300 object-cover'
              }
            />
          ))}
        </div>
      )}

      {hasImage && <ZaboActions notice={props} />}

      {hasImage && <ZaboTags notice={props} />}

      <div className={'mx-4 mt-[10px] line-clamp-3'}>{props.content}</div>

      {!hasImage && <ZaboActions notice={props} />}
    </div>
  );
};

export default Zabo;
