import { useTranslation } from 'react-i18next';

import { Modal } from '@/common/components/shared/modal';
import { Button } from '@/common/components/ui/button';

interface WithdrawalErrorModalProps {
  isOpen: boolean;
  close: () => void;
}

export function WithdrawalErrorModal({
  isOpen,
  close,
}: WithdrawalErrorModalProps) {
  const { t } = useTranslation('auth');

  if (!isOpen) return null;

  return (
    <Modal.Root isOpen={isOpen}>
      <Modal.Overlay onClick={close} />
      <Modal.Panel>
        <Modal.Body className="items-center gap-3">
          <Modal.Title>{t('mypage.withdrawal.error.title')}</Modal.Title>
          <Modal.Description className="whitespace-pre-wrap">
            {t('mypage.withdrawal.error.text')}
          </Modal.Description>
        </Modal.Body>
        <Modal.Actions>
          <div className="flex justify-center">
            <Button
              className="flex-1 px-8 py-3 text-base"
              variant="contained"
              onClick={close}
            >
              {t('mypage.withdrawal.error.confirm_btn')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal.Panel>
    </Modal.Root>
  );
}
