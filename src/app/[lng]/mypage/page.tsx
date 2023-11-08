import MypageProfile from "./MypageProfile";
import MypageSeperate from "./MypageSeperate";
import MypageTable from "./MypageTable";
import { useTranslation } from '@/app/i18next';

const MyPage = async () => {
    const isSmall = false;
    const isMobile = false;
    const Height = "1000px";   
    
    return (
      <>
      
      <div className={`mt-10 w-full flex h-${Height} justify-center items-center ${isSmall ? 'flex-col' : 'flex-row'} gap-20`}>
      <div className="flex flex-col relative m-10">
            <MypageProfile 
            name={"김지현"} id={"201910808"}
             email={"ss@gm.gist.ac.kr"}
             phone={"010-0000-0000"}/>

            {!isSmall && <MypageSeperate />}
      </div>
      <div className={`flex justify-center items-center flex-col`}>
      <div className={`w-96 mb-10 p-${isMobile ? '0' : '0'} `}>
            <MypageTable
            title={"내가 게시한 공지 목록"} 
            articles={[]} 
            link={""} />
            </div>
            <div className={`p-${isMobile ? '0' : '50'} `}>
            <MypageTable 
            title={"리마인드 설정한 게시물 목록"} 
            articles={[]} 
            link={""} />
            </div>
        </div>
        </div>
      </>
    );
  };
  
  export default MyPage;