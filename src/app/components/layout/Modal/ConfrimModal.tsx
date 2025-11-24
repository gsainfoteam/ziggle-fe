import { useRouter } from 'next/navigation';

import Check_mark from '@/assets/icons/checkmark.svg';
import Xmark_white from '@/assets/icons/xmark_white.svg';

import Button from '../../shared/Button';
export default function ConfirmModal({
  isOpen,
  unmount,
  lng,
}: {
  isOpen: boolean;
  unmount: () => void;
  lng: 'en' | 'ko';
}) {
  const router = useRouter();
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
      onClick={unmount}
    >
      <div
        className="flex h-[340px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={unmount}>
            <Xmark_white />
          </button>
        </div>
        <div className="flex justify-center">
          <Check_mark />
        </div>

        <p className="mb-3 text-center text-xl font-semibold md:text-2xl">
          개인정보 동의 완료
        </p>
        <p className="text-center">개인정보 동의가 완료되었습니다.</p>
        <div
          className="flex w-full justify-between
        "
        >
          <Button
            className="w-[220px]"
            variant="outlined"
            onClick={() =>
              router.push(
                `https://www.notion.so/infoteam-rulrudino/2025-276365ea27df80f584e5e5d96e923111`,
              )
            }
          >
            동의 내역확인
          </Button>
          <Button
            className="w-[220px]"
            variant="contained"
            onClick={() => router.push(`/${lng}/home`)}
          >
            메인으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
