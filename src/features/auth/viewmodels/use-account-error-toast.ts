import { useEffect } from 'react';

import { type AccountError, useAccount } from '@infoteam/account-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const errorMessageKey = (error: AccountError) => {
  switch (error.kind) {
    // 사용자가 IdP에서 직접 취소한 것이라 알릴 필요가 없다.
    case 'cancelled':
      return null;
    case 'verification':
      return 'errors.login_verification_required';
    case 'rejected':
      return 'errors.login_rejected';
    case 'expired':
      return 'errors.login_expired';
    case 'network':
      return 'errors.login_network';
    case 'unknown':
      return 'errors.login_failed';
  }
};

// SDK는 실패한 login()과 callback, 세션 복구 오류를 모두 store의 error에 남기므로, 여기서 한 번만 알린다.
export const useAccountErrorToast = () => {
  const { error } = useAccount();
  const { t } = useTranslation('auth');

  useEffect(() => {
    if (!error) return;
    const key = errorMessageKey(error);
    if (key) toast.error(t(key));
  }, [error, t]);
};
