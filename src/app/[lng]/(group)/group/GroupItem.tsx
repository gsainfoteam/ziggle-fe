import Image from 'next/image';
import Link from 'next/link';

import { GroupInfo } from '@/api/group/group';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import Crown from '@/assets/icons/crown.svg';
import GroupProfileDefault from '@/assets/icons/group-profile-default.webp';

const GroupItem = async ({
  params: { lng },
  groupParams,
}: {
  params: PropsWithLng;
  groupParams: {
    group: GroupInfo;
  };
}) => {
  const group = groupParams.group;

  return (
    <div className="w-full rounded-[15px] bg-greyLight p-5">
      <div className="flex items-center">
        <Image
          src={GroupProfileDefault}
          alt="group-default-profile"
          width={40}
          height={40}
        />

        <p className="ml-[15px] mr-[5px] text-xl font-semibold text-text">
          {group.name}
        </p>

        {group.president ? (
          <Crown className="ml-1 inline stroke-text" />
        ) : (
          <></>
        )}

        <div className="flex-grow" />

        <Link href={`/group/${group.uuid}`}>
          <ArrowRight className="h-[30px] stroke-text" />
        </Link>
      </div>
    </div>
  );
};

export default GroupItem;
