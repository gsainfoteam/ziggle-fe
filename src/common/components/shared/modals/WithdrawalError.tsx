import { Button } from '@/common/components/ui/button';
import { useTranslation } from 'react-i18next';

interface WithdrawalErrorModalProps {
  isOpen: boolean;
  close: () => void;
  lng: 'ko' | 'en';
}

export default function WithdrawalErrorModal({
  isOpen,
  close,
  lng: _lng,
}: WithdrawalErrorModalProps) {
  const { t } = useTranslation('auth');

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-text/50 dark:bg-dark_white/50"
      onClick={close}
    >
      <div
        className="mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col gap-6 rounded-[20px] bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-xl font-semibold md:text-2xl">
            {t('mypage.withdrawal.error.title')}
          </p>
          <p className="whitespace-pre-wrap text-center text-sm text-greyDark">
            {t('mypage.withdrawal.error.text')}
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            className="flex-1 px-8 py-3 text-base"
            variant="contained"
            onClick={close}
          >
            {t('mypage.withdrawal.error.confirm_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
}