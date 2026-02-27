import { useEffect, useRef } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useAuthContext } from 'react-oauth2-code-pkce';

import { Loading } from '@/common/components';

import { useAuth } from '../../viewmodels';

export function CallbackFrame() {
  const { token, loginInProgress: isIdpLoggingIn } = useAuthContext();
  const {
    logIn,
    logInMutation: { isPending: isLoggingIn },
  } = useAuth({ showToast: false });
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  const isLoading = isIdpLoggingIn || isLoggingIn;

  useEffect(() => {
    if (hasProcessed.current || isLoading) {
      return;
    }

    if (token) {
      hasProcessed.current = true;
      logIn({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      navigate({ to: '/' });
    }
  }, [token, logIn, isLoading, navigate]);

  return <Loading />;
}
