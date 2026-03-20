import { Button } from '@/common/components/ui/button';
import { useTranslation } from 'react-i18next';

import { ModalShell } from './modal-shell';

interface WithdrawalErrorModalProps {
  isOpen: boolean;
  close: () => void;
  lng: 'ko' | 'en';
}

export function WithdrawalErrorModal({
  isOpen,
  close,
  lng: _lng,
}: WithdrawalErrorModalProps) {
  const { t } = useTranslation('auth');

  if (!isOpen) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      close={close}
      title={
        <p className="text-center text-xl font-semibold md:text-2xl">
          {t('mypage.withdrawal.error.title')}
        </p>
      }
      description={
        <p className="whitespace-pre-wrap text-center text-sm text-greyDark">
          {t('mypage.withdrawal.error.text')}
        </p>
      }
      bodyClassName="flex flex-col items-center gap-3"
      actions={
        <div className="flex justify-center">
          <Button
            className="flex-1 px-8 py-3 text-base"
            variant="contained"
            onClick={close}
          >
            {t('mypage.withdrawal.error.confirm_btn')}
          </Button>
        </div>
      }
    />
  );
}