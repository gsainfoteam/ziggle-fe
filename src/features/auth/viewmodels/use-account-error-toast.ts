import { useEffect } from 'react';

import { useAccount } from '@infoteam/account-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// SDK는 실패한 login()과 callback, 세션 복구 오류를 모두 store의 error에 남기므로, 여기서 한 번만 알린다.
export const useAccountErrorToast = () => {
  const { error } = useAccount();
  const { t } = useTranslation('auth');

  useEffect(() => {
    if (!error) return;
    switch (error.kind) {
      // 사용자가 IdP에서 직접 취소한 것이라 알릴 필요가 없다.
      case 'cancelled':
        return;
      case 'verification':
        toast.error(t('errors.login_verification_required'));
        return;
      case 'rejected':
        toast.error(t('errors.login_rejected'));
        return;
      case 'expired':
        toast.error(t('errors.login_expired'));
        return;
      case 'network':
        toast.error(t('errors.login_network'));
        return;
      case 'unknown':
        toast.error(t('errors.login_failed'));
        return;
    }
  }, [error, t]);
};
