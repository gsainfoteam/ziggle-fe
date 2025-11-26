import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { toast } from 'sonner';

import { ziggleApi } from '@/api';
import { useTranslation } from '@/app/i18next/client';
import Xmark_dark from '@/assets/icons/xmark_dark.svg';
import Xmark_white from '@/assets/icons/xmark_white.svg';

import Button from '../../shared/Button';
import CautionModal from './CautionModal';
import ConfirmModal from './ConfrimModal';
import PrivacyPolicy from './policy';

export default function PolicyModal({
  unmount,
  lng,
}: {
  unmount: () => void;
  lng: 'ko' | 'en';
}) {
  const { t } = useTranslation(lng);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const unmountPolicy = unmount;

  const handleCautionModal = () => {
    unmount();
    overlay.open(({ isOpen, unmount }) => {
      return (
        <CautionModal
          isOpen={isOpen}
          unmount={unmount}
          unmountPolicy={unmountPolicy}
          lng={lng}
        />
      );
    });
  };

  const handleConfirmModal = async () => {
    if (!isChecked) return;
    try {
      await ziggleApi.post('user/consent');
    } catch {
      toast.error(t('zigglePolicyModal.policy.fail'));
      return;
    }
    await ziggleApi.post('user/consent');
    unmount();
    overlay.open(({ isOpen, unmount }) => {
      return <ConfirmModal isOpen={isOpen} unmount={unmount} lng={lng} />;
    });
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50">
      <div
        className="mx-10 flex h-auto max-w-[500px] flex-col justify-between gap-2.5 rounded-[20px] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={unmount}>
            <Xmark_white />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <p className="mb-3 text-xl font-semibold md:text-2xl">
            {t('zigglePolicyModal.policy.title')}
          </p>

          <p>{t('zigglePolicyModal.policy.content')}</p>
          <div className="h-[57.5px] w-[415.5px] overflow-hidden rounded-xl border border-primary">
            <table className="h-full w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th className="border-r border-primary">
                    {t('zigglePolicyModal.table.header.purpose')}
                  </th>
                  <th className="border-r border-primary">
                    {t('zigglePolicyModal.table.header.mandatory')}
                  </th>
                  <th className="border-r border-primary">
                    {t('zigglePolicyModal.table.header.choice')}
                  </th>
                  <th className="">
                    {t('zigglePolicyModal.table.header.duration')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-primary">
                  <td className="border-r border-primary">
                    {t('zigglePolicyModal.table.content.purpose')}
                  </td>
                  <td className="border-r border-primary">
                    {t('zigglePolicyModal.table.content.mandatory')}
                  </td>
                  <td className="border-r border-primary">
                    {t('zigglePolicyModal.table.content.choice')}
                  </td>
                  <td className="">
                    {t('zigglePolicyModal.table.content.duration')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>{t('zigglePolicyModal.policy.detail')}</p>
          <div className="max-h-[100px] overflow-y-auto scroll-smooth rounded-[10px] border border-primary p-[10px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[4px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-clip-padding dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-[14px]">
            <PrivacyPolicy />
          </div>
          <div className="flex gap-2">
            <input
              className=""
              id="confirm"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="confirm">
              {t('zigglePolicyModal.policy.checkbox')}
            </label>
          </div>

          <div className="flex w-full justify-between gap-2.5">
            <Button
              className="flex-1"
              variant="outlined"
              onClick={handleCautionModal}
            >
              {t('zigglePolicyModal.policy.cancelButton')}
            </Button>
            <Button
              className="flex-1"
              variant={isChecked ? 'contained' : 'disabled'}
              onClick={handleConfirmModal}
            >
              {t('zigglePolicyModal.policy.confirmButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
