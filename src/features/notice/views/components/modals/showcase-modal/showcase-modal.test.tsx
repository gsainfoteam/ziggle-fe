/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type * as Download from './download';

const saveImageMock = vi.fn();
const saveImagesMock = vi.fn();

// jsdom 에는 ResizeObserver 가 없다. 썸네일 목록의 가장자리 흐림이 이걸 쓴다.
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('./download', async (importOriginal) => {
  const actual = await importOriginal<typeof Download>();
  return {
    ...actual,
    saveImage: (...args: unknown[]) => saveImageMock(...args),
    saveImages: (...args: unknown[]) => saveImagesMock(...args),
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
  Overflow: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
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

  it('clamps an out-of-range initial index', async () => {
    await renderModal({ initialIndex: 9 });

    expect(screen.getByText('2 / 2')).toBeTruthy();
  });

  it('saves just the shown image from the single save button', async () => {
    await renderModal({ initialIndex: 1 });

    fireEvent.click(screen.getByLabelText('detail.download_current'));

    expect(saveImageMock).toHaveBeenCalledWith(sources[1], '공지 이미지-2');
    expect(saveImagesMock).not.toHaveBeenCalled();
  });

  it('hands every image to the bulk save', async () => {
    await renderModal();

    fireEvent.click(screen.getByText('detail.download_all'));

    expect(saveImagesMock).toHaveBeenCalledWith(sources, '공지 이미지');
  });
});
