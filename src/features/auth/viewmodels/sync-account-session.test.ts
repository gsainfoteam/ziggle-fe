import { QueryClient } from '@tanstack/react-query';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'zustand/vanilla';

import { useAuthPrompt } from './stores';
import { syncAccountSession } from './sync-account-session';

type Status = 'loading' | 'authenticated' | 'unauthenticated';

const { store } = vi.hoisted(() => ({
  store: { current: null as unknown },
}));

vi.mock('@/common/lib', () => ({
  account: {
    get store() {
      return store.current;
    },
  },
}));

const setup = (status: Status) => {
  const accountStore = createStore(() => ({
    status,
    accessToken: status === 'authenticated' ? 'token' : null,
  }));
  store.current = accountStore;
  const queryClient = new QueryClient();
  queryClient.setQueryData(['me'], { name: 'user' });
  const onStatusChange = vi.fn();
  const unsubscribe = syncAccountSession({ queryClient, onStatusChange });
  return { accountStore, queryClient, onStatusChange, unsubscribe };
};

describe('syncAccountSession', () => {
  beforeEach(() => {
    useAuthPrompt.getState().setRequiredConsents(true);
  });

  it('clears the previous user when the session ends', () => {
    const { accountStore, queryClient, onStatusChange } =
      setup('authenticated');

    accountStore.setState({ status: 'unauthenticated', accessToken: null });

    expect(queryClient.getQueryData(['me'])).toBeUndefined();
    expect(useAuthPrompt.getState().requiredConsents).toBeUndefined();
    expect(onStatusChange).toHaveBeenCalledTimes(1);
  });

  it('keeps the cache when a session is restored', () => {
    const { accountStore, queryClient, onStatusChange } = setup('loading');

    accountStore.setState({ status: 'authenticated', accessToken: 'token' });

    expect(queryClient.getQueryData(['me'])).toEqual({ name: 'user' });
    expect(useAuthPrompt.getState().requiredConsents).toBe(true);
    expect(onStatusChange).toHaveBeenCalledTimes(1);
  });

  it('ignores a refresh that only changes the token', () => {
    const { accountStore, queryClient, onStatusChange } =
      setup('authenticated');

    accountStore.setState({ accessToken: 'new-token' });

    expect(queryClient.getQueryData(['me'])).toEqual({ name: 'user' });
    expect(onStatusChange).not.toHaveBeenCalled();
  });
});
