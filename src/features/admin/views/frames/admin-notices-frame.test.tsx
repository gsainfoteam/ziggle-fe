/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { routeSearch, navigate } = vi.hoisted(() => ({
  routeSearch: { page: 0, search: 'initial' as string | undefined },
  navigate: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useSearch: () => routeSearch,
  useNavigate: () => navigate,
  Link: () => null,
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@/common/components', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
  Loading: () => null,
}));
vi.mock('../../viewmodels', () => ({
  Category: { EVENT: 'EVENT' },
  useAdminNotices: () => ({ data: { list: [], total: 0 }, isLoading: false }),
}));

import { AdminNoticesFrame } from './admin-notices-frame';

afterEach(cleanup);

describe('admin notice search input', () => {
  it('follows URL search changes while preserving drafts on unrelated rerenders', () => {
    const { rerender } = render(<AdminNoticesFrame />);
    const input = screen.getByRole('textbox', {
      name: 'notices.search',
    }) as HTMLInputElement;
    expect(input.value).toBe('initial');

    fireEvent.change(input, { target: { value: 'unsent draft' } });
    routeSearch.page = 1;
    rerender(<AdminNoticesFrame />);
    expect(input.value).toBe('unsent draft');

    routeSearch.search = 'previous search';
    rerender(<AdminNoticesFrame />);
    expect(input.value).toBe('previous search');

    routeSearch.search = undefined;
    rerender(<AdminNoticesFrame />);
    expect(input.value).toBe('');
  });
});
