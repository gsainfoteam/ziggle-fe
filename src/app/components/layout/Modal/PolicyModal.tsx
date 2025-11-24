import { overlay } from 'overlay-kit';

import Xmark_dark from '@/assets/icons/xmark_dark.svg';
import Xmark_white from '@/assets/icons/xmark_white.svg';

import Button from '../../shared/Button';
import CautionModal from './CautionModal';
import ConfirmModal from './ConfrimModal';
import PrivacyPolicy from './policy';
export default function PolicyModal({
  isOpen,
  unmount,
}: {
  isOpen: boolean;
  unmount: () => void;
}) {
  const handleCutionModal = () => {
    unmount();
    overlay.open(({ isOpen, unmount }) => {
      return <CautionModal isOpen={isOpen} unmount={unmount} />;
    });
  };

  const handleConfirmModal = () => {
    unmount();
    overlay.open(({ isOpen, unmount }) => {
      return <ConfirmModal isOpen={isOpen} unmount={unmount} />;
    });
  };
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
      onClick={unmount}
    >
      <div
        className="flex h-[500px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={unmount}>
            <Xmark_white />
          </button>
        </div>
        <p className="mb-3 text-xl font-semibold md:text-2xl">
          개인정보 처리 방침 계정 안내
        </p>

        <div className="flex grow flex-col justify-around">
          <p>
            지글의 개인정보 수집 목적은 다음과 같습니다.
            <br /> 내용을 자세히 읽어 보신 후 동의를 결정하여 주시길 바랍니다.
          </p>
          <div className="overflow-hidden rounded-xl border border-primary">
            <table className="w-full text-center text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    수집 목적
                  </th>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    필수 항목
                  </th>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    선택 항목
                  </th>
                  <th className="p-3">이용 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-primary">
                  <td className="border-r border-primary p-3 last:border-r-0">
                    관리
                  </td>
                  <td className="border-r border-primary p-3 last:border-r-0">
                    이름, 이메일
                  </td>
                  <td className="border-r border-primary p-3 last:border-r-0">
                    연락처, 학번
                  </td>
                  <td className="p-3">수집일부터 1년까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>자세한 내용은 개인정보 처리 방침을 확인해주세요.</p>
          <div className="max-h-[6rem] overflow-y-auto scroll-smooth rounded-lg border border-primary">
            <PrivacyPolicy />
          </div>
          <div className="flex gap-2">
            <input className="" id="confirm" type="checkbox" />
            <label htmlFor="confirm">(필수) 개인정보 수집 동의</label>
          </div>
        </div>

        <div
          className="flex w-full justify-between
        "
        >
          <Button
            className="w-[220px]"
            variant="outlined"
            onClick={handleCutionModal}
          >
            동의 안함
          </Button>
          <Button
            className="w-[220px]"
            variant="contained"
            onClick={handleConfirmModal}
          >
            동의
          </Button>
        </div>
      </div>
    </div>
  );
}
