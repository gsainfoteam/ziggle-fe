import Image from 'next/image';

import { getGroup } from '@/api/group/group';
import Button from '@/app/components/atoms/Button';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import GroupProfileDefault from '@/assets/icons/group-profile-default.webp';

import GroupDetailTabs from './GroupDetailTabs';
import GroupIntroTab from './GroupIntroTab';
import GroupMembersTab from './GroupMembersTab';
import GroupNoticesTab from './GroupNoticesTab';

interface GroupDetailPageProps {
  params: PropsWithLng<{ uuid: string }>;
  searchParams?: { tab: string; page: string };
}

const GroupDetailPage = async ({
  params: { uuid, lng },
  searchParams,
}: GroupDetailPageProps) => {
  const group = await getGroup(uuid);

  const { t } = await createTranslation(lng);

  const tab = searchParams?.tab ?? 'info';

  return (
    <main className={'flex flex-col items-center'}>
      <div className={'content flex max-w-[800px] flex-col'}>
        <div className={'flex items-center gap-[25px]'}>
          <Image
            src={GroupProfileDefault}
            width={160}
            height={160}
            alt={'group default profile'}
          />

          <div className={'flex flex-col items-start'}>
            <p className={'text-[34px] font-bold leading-9'}>{group.name}</p>

            <p className={'mt-1 text-greyDark'}>
              {t('group.memberCount', {
                count: group.memberCount,
              })}
              {' · '}
              {t('group.noticeCount', {
                count: 0,
              })}
            </p>

            <Button
              variant="contained"
              className={'mt-3 rounded-[10px] md:px-6 md:py-2'}
            >
              <p>{t('group.favorite')}</p>
            </Button>
          </div>
        </div>

        <p
          className={
            'my-6 w-full rounded-2xl bg-greyLight px-5 py-[15px] text-lg text-greyDark'
          }
        >
          {group.description}
        </p>

        <GroupDetailTabs
          activeTab={tab}
          lng={lng}
          searchParams={searchParams}
        />

        {tab === 'info' && <GroupIntroTab />}
        {tab === 'notice' && (
          <GroupNoticesTab lng={lng} searchParams={searchParams} />
        )}
        {tab === 'member' && <GroupMembersTab />}
      </div>
    </main>
  );
};

export default GroupDetailPage;
