import { createTranslation } from '@/app/i18next';

import { Locale } from '../../i18next/settings';
import MypageProfile from './MypageProfile';
import MypageSeperate from './MypageSeperate';
import MypageTable from './MypageTable';

export default async function MyPage({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = await createTranslation(lng, 'translation');

  return (
    <>
      <div className="h-1500 xl:h-1000 mt-10 flex w-full flex-col items-center justify-center gap-20 xl:flex-row">
        <div className="relative m-10 flex flex-col">
          <MypageProfile
            lng={lng}
            name={'김지현'}
            id={'201910808'}
            email={'mynameisjihyunkim@gm.gist.ac.kr'}
            phone={'010-0000-0000'}
          />
        </div>
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="xl:p-50 mb-10 p-0">
            <MypageTable
              lng={lng}
              title={t('mypage.myNotice')}
              articles={[]}
              link={''}
            />
          </div>
          <div className="xl:p-50 p-0">
            <MypageTable
              lng={lng}
              title={t('mypage.remindNotice')}
              articles={[
                { title: '제목1', createdAt: '2021-09-01' },
                { title: '제목2', createdAt: '2021-09-02' },
                { title: '제목2', createdAt: '2021-09-02' },
                { title: '제목2', createdAt: '2021-09-02' },
              ]}
              link={''}
            />
          </div>
        </div>
      </div>
    </>
  );
}
