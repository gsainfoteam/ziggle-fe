import { useTranslation } from 'react-i18next';

import CheckIcon from '@/assets/icons/check.svg?react';
import { Button, Modal } from '@/common/components';

interface WithdrawalSuccessModalProps {
  isOpen: boolean;
  close: () => void;
  onCloseComplete?: () => void | Promise<void>;
}

export function WithdrawalSuccessModal({
  isOpen,
  close,
  onCloseComplete,
}: WithdrawalSuccessModalProps) {
  const { t } = useTranslation('auth');

  if (!isOpen) return null;

  const handleClose = async () => {
    try {
      await onCloseComplete?.();
    } finally {
      close();
    }
  };

  const handleCloseClick = () => {
    void handleClose();
  };

  return (
    <Modal.Root isOpen={isOpen}>
      <Modal.Overlay onClick={handleCloseClick} />
      <Modal.Panel>
        <Modal.Header className="inline-flex items-center justify-center gap-2.5">
          <div className="inline-flex size-16 flex-col items-center justify-center gap-2.5 rounded-[32.50px] bg-orange-600 px-3.5 py-6">
            <CheckIcon className="h-full" />
          </div>
        </Modal.Header>
        <Modal.Body className="items-center gap-4">
          <Modal.Title>{t('mypage.withdrawal.success.title')}</Modal.Title>
          <Modal.Description>{t('mypage.withdrawal.success.text')}</Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <div className="flex justify-center">
            <Button
              className="flex-1 whitespace-nowrap py-3 text-base text-white md:py-3.5"
              variant="contained"
              onClick={handleCloseClick}
            >
              {t('mypage.withdrawal.success.goFirst')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal.Panel>
    </Modal.Root>
  );
}
