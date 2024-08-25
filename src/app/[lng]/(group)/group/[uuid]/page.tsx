import Image from 'next/image';

import { getGroup } from '@/api/group/group';
import Button from '@/app/components/atoms/Button';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import GroupProfileDefault from '@/assets/icons/group-profile-default.webp';

import GroupDetailTabs from './GroupDetailTabs';

interface GroupDetailPageProps {
  params: PropsWithLng<{ uuid: string }>;
}

const GroupDetailPage = async ({
  params: { uuid, lng },
}: GroupDetailPageProps) => {
  const group = await getGroup(uuid);

  const { t } = await createTranslation(lng);

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

        <GroupDetailTabs lng={lng} />
      </div>
    </main>
  );
};

export default GroupDetailPage;
