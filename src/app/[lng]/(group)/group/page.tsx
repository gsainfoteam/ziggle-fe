import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import * as process from 'node:process';

import { redirect } from 'next/navigation';

import { auth } from '@/api/auth/auth';
import { getGroupContainMe } from '@/api/group/group';
import Button from '@/app/components/atoms/Button';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import GroupList from './GroupList';
import NotInGroup from './NotInGroup';

const GroupMainPage = async ({ params: { lng } }: { params: PropsWithLng }) => {
  const { t } = await createTranslation(lng);

  const userData = await auth();
  if (!userData) redirect(`/${lng}/login`);

  const groupList = await getGroupContainMe('included');

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[600px] flex-col items-center">
        <div className="title mb-10 w-full text-4xl font-bold text-text">
          {t('group.mainTitle')}
        </div>
        {groupList.length === 0 ? (
          <NotInGroup params={{ lng }} />
        ) : (
          groupList.map((group) => {
            return (
              <GroupList
                params={{ lng }}
                key={group.name}
                groupParams={{ group }}
              />
            );
          })
        )}
        <div className="my-10 w-full rounded-[15px] bg-greyLight p-6 text-base font-normal text-greyDark dark:bg-dark_greyDark">
          {t('group.mainDescription')}
        </div>
        <Button variant="contained" className="mb-4 w-60 rounded-[10px] py-2">
          <p className="mx-3 my-1 text-base font-bold">
            {t('group.createGroup')}
          </p>
        </Button>
      </div>
    </main>
  );
};

export default GroupMainPage;
