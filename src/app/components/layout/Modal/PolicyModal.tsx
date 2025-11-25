import { overlay } from 'overlay-kit';
import { useState } from 'react';

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

  const postConcent = async () => {
    await ziggleApi.post('user/consent');
  };

  const handleCutionModal = () => {
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

  const handleConfirmModal = () => {
    postConcent();
    unmount();
    overlay.open(({ isOpen, unmount }) => {
      return <ConfirmModal isOpen={isOpen} unmount={unmount} lng={lng} />;
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
          {t('zigglePolicyModal.policy.title')}
        </p>

        <div className="flex grow flex-col justify-around">
          <p>{t('zigglePolicyModal.policy.content')}</p>
          <div className="overflow-hidden rounded-xl border border-primary">
            <table className="w-full text-center text-sm">
              <thead className="bg-primary/10">
                <tr>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.header.purpose')}
                  </th>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.header.mandatory')}
                  </th>
                  <th className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.header.choice')}
                  </th>
                  <th className="p-3">
                    {t('zigglePolicyModal.table.header.duration')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-primary">
                  <td className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.content.purpose')}
                  </td>
                  <td className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.content.mandatory')}
                  </td>
                  <td className="border-r border-primary p-3 last:border-r-0">
                    {t('zigglePolicyModal.table.content.choice')}
                  </td>
                  <td className="p-3">
                    {t('zigglePolicyModal.table.content.duration')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>{t('zigglePolicyModal.policy.detail')}</p>
          <div className="max-h-[6rem] overflow-y-auto scroll-smooth rounded-lg border border-primary">
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
            {t('zigglePolicyModal.policy.cancelButton')}
          </Button>
          <Button
            className="w-[220px]"
            variant={isChecked ? 'contained' : 'disabled'}
            onClick={handleConfirmModal}
          >
            {t('zigglePolicyModal.policy.confirmButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
