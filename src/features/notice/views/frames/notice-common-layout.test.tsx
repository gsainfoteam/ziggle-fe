/** @vitest-environment jsdom */

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useUserMock = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

vi.mock('@/common/components', () => ({
  Loading: () => <div data-testid="loading" />,
}));

vi.mock('@/features/auth', () => ({
  useUser: () => useUserMock(),
}));

vi.mock('../components/layout/notice-shell', () => ({
  NoticeShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="notice-shell">{children}</div>
  ),
}));

describe('NoticeCommonLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the real shell and outlet for guests instead of skeleton chrome', async () => {
    useUserMock.mockReturnValue({ data: null });

    const { NoticeCommonLayout } = await import('./notice-common-layout');
    render(<NoticeCommonLayout />);

    expect(screen.getByTestId('notice-shell')).toBeTruthy();
    expect(screen.getByTestId('outlet')).toBeTruthy();
  });

  it('shows loading while auth is resolving', async () => {
    useUserMock.mockReturnValue({ data: undefined });

    const { NoticeCommonLayout } = await import('./notice-common-layout');
    render(<NoticeCommonLayout />);

    expect(screen.getByTestId('loading')).toBeTruthy();
  });
});
