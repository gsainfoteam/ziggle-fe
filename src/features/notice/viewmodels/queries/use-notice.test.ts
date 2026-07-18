/** @vitest-environment jsdom */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useQueryMock = vi.fn();
const useUserMock = vi.fn();

vi.mock('@/common/lib', () => ({
  $api: {
    useQuery: (...args: unknown[]) => useQueryMock(...args),
  },
  api: {
    GET: vi.fn(),
  },
}));

vi.mock('@/features/auth', () => ({
  useUser: () => useUserMock(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'ko' },
    t: (key: string) => key,
  }),
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('useNotice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useQueryMock.mockReturnValue({
      data: undefined,
      error: null,
      isError: false,
      isLoading: false,
    });
  });

  it('enables the notice detail query for guests (user is null)', async () => {
    useUserMock.mockReturnValue({ data: null });

    const { useNotice } = await import('./use-notice');
    renderHook(() => useNotice(1));

    expect(useQueryMock).toHaveBeenCalledWith(
      'get',
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ enabled: true }),
    );
  });
});
