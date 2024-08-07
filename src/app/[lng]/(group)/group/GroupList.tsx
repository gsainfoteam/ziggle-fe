import { groupInfo } from '@/api/group/group';
import Button from '@/app/components/atoms/Button';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import Crown from '@/assets/icons/crown.svg';
import UserCircle from '@/assets/icons/user-circle.svg';
import UserCrown from '@/assets/icons/user-crown.svg';

const GroupList = async ({
  params: { lng },
  groupParams,
}: {
  params: PropsWithLng;
  groupParams: {
    group: groupInfo;
  };
}) => {
  const { t } = await createTranslation(lng);

  const group = groupParams.group;

  return (
    <div
      className="mb-3 flex w-full justify-between rounded-[10px] border border-primary p-5"
      key={group.name}
    >
      <div className="flex flex-col pr-3">
        <div className="mb-2 inline items-center text-xl font-bold text-primary">
          {group.name}
          {group.isAdmin ? <Crown className="ml-1 inline" /> : <></>}
        </div>
        <div className="mb-1 flex break-keep text-base font-normal text-greyDark">
          <UserCrown className="mr-1" />
          {group.leaderName}
        </div>
        <div className="flex text-base font-normal text-greyDark">
          <UserCircle className="mr-1" />
          {group.memberCount}
        </div>
      </div>
      <div className="h-8 min-w-fit">
        {group.isAdmin ? (
          <Button className="h-8 w-full rounded-[5px] bg-primary px-2.5 py-1 text-white hover:brightness-90">
            <p className="text-base font-semibold">{t('group.manageGroup')}</p>
          </Button>
        ) : (
          <Button className="h-8 w-full flex-col items-center rounded-[5px] border-[1px] border-solid border-primary px-2.5 py-1 text-primary hover:bg-secondary">
            <p className="text-base font-semibold">{t('group.leaveGroup')}</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default GroupList;
