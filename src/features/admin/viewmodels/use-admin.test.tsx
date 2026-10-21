/** @vitest-environment jsdom */
import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useUserMock, queryMock, patchMock } = vi.hoisted(() => ({
  useUserMock: vi.fn(),
  queryMock: vi.fn(),
  patchMock: vi.fn(),
}));
vi.mock('@/features/auth', () => ({ useUser: useUserMock }));
vi.mock('@/common/lib', () => ({
  $api: { useQuery: queryMock },
  api: { PATCH: patchMock },
}));

import {
  useAdminAccess,
  useAdminNotice,
  useAdminNotices,
  useSetAdmin,
} from './use-admin';

describe('admin access and requests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryMock.mockReturnValue({});
  });

  it.each([null, undefined, {}, { isAdmin: false }, { isAdmin: 'true' }])(
    'blocks access unless the server explicitly grants admin permission: %j',
    (data) => {
      useUserMock.mockReturnValue({ data });
      const { result } = renderHook(() => useAdminAccess());
      expect(result.current.isAdmin).toBe(false);
      renderHook(() => useAdminNotices({ page: 0 }));
      expect(queryMock.mock.lastCall?.[3].enabled).toBe(false);
    },
  );

  it('allows admins and sends server pagination and filters', () => {
    useUserMock.mockReturnValue({ data: { isAdmin: true } });
    renderHook(() => useAdminNotices({ page: 2, search: 'GIST' }));
    expect(queryMock.mock.lastCall?.[2].params.query).toMatchObject({
      limit: 20,
      offset: 40,
      search: 'GIST',
    });
    expect(queryMock.mock.lastCall?.[3].enabled).toBe(true);
  });

  it.each([NaN, 0, -1, 1.5])(
    'does not request invalid notice IDs: %s',
    (id) => {
      useUserMock.mockReturnValue({ data: { isAdmin: true } });
      renderHook(() => useAdminNotice(id));
      expect(queryMock.mock.lastCall?.[3].enabled).toBe(false);
    },
  );

  it('sends permission changes and refreshes the current account after self-revocation', async () => {
    const client = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const user = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      isAdmin: false,
    };
    patchMock.mockResolvedValue({ data: user });
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useSetAdmin(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({ uuid: user.uuid, isAdmin: false });
    });
    expect(patchMock).toHaveBeenCalledWith('/user/{uuid}/admin', {
      params: { path: { uuid: user.uuid } },
      body: { isAdmin: false },
    });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ['get', '/user/info'],
    });
    client.clear();
  });

  it('preserves API errors and refreshes permission after a forbidden response', async () => {
    const client = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const error = { statusCode: 403 };
    patchMock.mockResolvedValue({ error });
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useSetAdmin(), { wrapper });
    await act(async () => {
      await expect(
        result.current.mutateAsync({ uuid: 'target', isAdmin: true }),
      ).rejects.toEqual(error);
    });
    expect(invalidate).toHaveBeenCalled();
    client.clear();
  });
});
