import MypageProfile from "./MypageProfile";
import MypageSeperate from "./MypageSeperate";
import MypageTable from "./MypageTable";
import { useTranslation } from '@/app/i18next';
import { Locale } from '../../i18next/settings';

export default async function MyPage({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
    const { t } = await useTranslation(lng, 'translation');

    return (
      <>
      
      <div className={`mt-10 w-full flex h-1500 xl:h-1000 justify-center items-center flex-col xl:flex-row gap-20`}>
      <div className="flex flex-col relative m-10">
            <MypageProfile 
             logout={t('mypage.logout')}
             quit={t('mypage.quit')}

             name={"김지현"} 
             id={"201910808"}
             email={"ss@gm.gist.ac.kr"}
             phone={"010-0000-0000"}/>
            <div className="xl:flex hidden">
            <MypageSeperate />
            </div>
      </div>
      <div className={`flex justify-center items-center flex-col`}>
      <div className={`mb-10 p-0 xl:p-50`}>
            <MypageTable
            totalList={t('mypage.totalList')}
            noArticle={t('mypage.noArticle')}


            title={t('mypage.myNotice')} 
            articles={[]} 
            link={""} />
            </div>
            <div className={`p-0 xl:p-50 `}>
            <MypageTable 
            totalList={t('mypage.totalList')}
            noArticle={t('mypage.noArticle')}

            title={t('mypage.remindNotice')} 
            articles={[{"title":"제목1","createdAt":"2021-09-01"},{"title":"제목2","createdAt":"2021-09-02"}]} 
            link={""} />
            </div>
        </div>
        </div>
      </>
    );
  };
  