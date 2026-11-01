import { useAccount } from '@gsainfoteam/account-react';

export const useAuth = () => {
  const { status, login } = useAccount();
  return { status, login };
};
