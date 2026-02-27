import MypageActions from '../components/mypage-actions';
import { MypageButtons } from '../components/mypage-button';
import { MypageProfile } from '../components/mypage-profile';

export const MypageFrame = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex min-w-full flex-col gap-5 p-4 md:min-w-[500px]">
        <MypageProfile />
        <MypageButtons />
        <MypageActions />
      </div>
    </div>
  );
};
