/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fileNameOf } from './download';

import type * as Download from './download';

const downloadImageMock = vi.fn();
const openInNewTabMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('sonner', () => ({
  toast: { error: (...args: unknown[]) => toastErrorMock(...args) },
}));

vi.mock('./download', async (importOriginal) => {
  const actual = await importOriginal<typeof Download>();
  return {
    ...actual,
    downloadImage: (...args: unknown[]) => downloadImageMock(...args),
    openInNewTab: (...args: unknown[]) => openInNewTabMock(...args),
  };
});

vi.mock('framer-motion', () => ({
  motion: {
    img: ({
      drag: _drag,
      dragConstraints: _dragConstraints,
      dragElastic: _dragElastic,
      dragMomentum: _dragMomentum,
      onDragEnd: _onDragEnd,
      dragDirectionLock: _dragDirectionLock,
      initial: _initial,
      animate: _animate,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) => (
      <img {...props} />
    ),
  },
}));

vi.mock('@/common/components', () => ({
  Button: ({
    animated: _animated,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    animated?: boolean;
  }) => <button {...props} />,
  Dialog: {
    Root: ({
      isOpen,
      children,
    }: {
      isOpen: boolean;
      children: React.ReactNode;
    }) => (isOpen ? <div>{children}</div> : null),
  },
}));

const sources = ['https://cdn.test/a.png', 'https://cdn.test/b.png'];

const renderModal = async (props: Record<string, unknown> = {}) => {
  const { default: ShowcaseModal } = await import('.');
  const onClose = vi.fn();
  render(
    <ShowcaseModal
      isOpen
      onClose={onClose}
      sources={sources}
      alt="공지 이미지"
      {...props}
    />,
  );
  return { onClose };
};

const shownImage = () => screen.getByAltText('공지 이미지') as HTMLImageElement;

describe('fileNameOf', () => {
  it('drops the query string from a presigned url', () => {
    expect(
      fileNameOf('https://s3.test/bucket/poster.png?X-Amz-Signature=abc', 'x'),
    ).toBe('poster.png');
  });

  it('decodes percent-encoded names', () => {
    expect(fileNameOf('https://s3.test/%EA%B0%80%EC%9D%84.png', 'x')).toBe(
      '가을.png',
    );
  });

  it('falls back when the path carries no file name', () => {
    expect(fileNameOf('https://s3.test/?a=1', 'notice-1')).toBe('notice-1');
  });
});

describe('ShowcaseModal', () => {
  // 실패 케이스에서 심은 rejection 이 다음 테스트로 새지 않게 구현까지 되돌린다.
  beforeEach(() => vi.resetAllMocks());
  afterEach(cleanup);

  it('walks the list with the arrow keys', async () => {
    await renderModal();

    expect(screen.getByText('1 / 2')).toBeTruthy();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 2')).toBeTruthy();
    expect(shownImage().src).toBe(sources[1]);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 2')).toBeTruthy();
    expect(shownImage().src).toBe(sources[0]);
  });

  it('stops at both ends of the list', async () => {
    await renderModal();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('1 / 2')).toBeTruthy();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 2')).toBeTruthy();
  });

  it('jumps to the image picked from the sheet', async () => {
    await renderModal();

    fireEvent.click(screen.getByLabelText('2 / 2'));

    expect(screen.getByText('2 / 2')).toBeTruthy();
    expect(shownImage().src).toBe(sources[1]);
  });

  it('drops the thumbnails and the bulk save for a single image', async () => {
    await renderModal({ sources: [sources[0]] });

    expect(screen.queryByLabelText('1 / 1')).toBeNull();
    expect(screen.queryByText('detail.download_all')).toBeNull();
    expect(screen.getByText('1 / 1')).toBeTruthy();
  });

  it('offers the zoom reset only while zoomed in', async () => {
    await renderModal();

    expect(screen.queryByLabelText('detail.reset_zoom')).toBeNull();

    fireEvent.doubleClick(shownImage());
    expect(screen.getByLabelText('detail.reset_zoom')).toBeTruthy();

    fireEvent.click(screen.getByLabelText('detail.reset_zoom'));
    expect(screen.queryByLabelText('detail.reset_zoom')).toBeNull();
  });

  it('drops the zoom when the shown image changes', async () => {
    await renderModal();

    fireEvent.doubleClick(shownImage());
    expect(screen.getByLabelText('detail.reset_zoom')).toBeTruthy();

    fireEvent.click(screen.getByLabelText('2 / 2'));
    expect(screen.queryByLabelText('detail.reset_zoom')).toBeNull();
  });

  it('clamps an out-of-range initial index', async () => {
    await renderModal({ initialIndex: 9 });

    expect(screen.getByText('2 / 2')).toBeTruthy();
  });

  it('saves only the current image from the single download button', async () => {
    await renderModal({ initialIndex: 1 });

    fireEvent.click(screen.getByLabelText('detail.download_current'));
    await vi.waitFor(() => expect(downloadImageMock).toHaveBeenCalledTimes(1));

    expect(downloadImageMock).toHaveBeenCalledWith(sources[1], '공지 이미지-2');
  });

  it('opens a new tab and warns when saving fails', async () => {
    downloadImageMock.mockRejectedValue(new Error('cors'));
    await renderModal();

    fireEvent.click(screen.getByText('detail.download_all'));
    await vi.waitFor(() => expect(toastErrorMock).toHaveBeenCalled());

    expect(openInNewTabMock).toHaveBeenCalledTimes(sources.length);
  });
});
