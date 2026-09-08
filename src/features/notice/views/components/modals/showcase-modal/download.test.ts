/** @vitest-environment jsdom */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fileNameOf, saveImage, saveImages } from './download';

const clicked: string[] = [];

beforeEach(() => {
  clicked.length = 0;
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clicked.push(this.href);
  });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

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

describe('saveImage', () => {
  it('clicks a link at the image and leaves no node behind', () => {
    saveImage('https://s3.test/poster.png', 'notice-1');

    expect(clicked).toEqual(['https://s3.test/poster.png']);
    expect(document.querySelectorAll('a')).toHaveLength(0);
  });
});

describe('saveImages', () => {
  const sources = [
    'https://s3.test/1.png',
    'https://s3.test/2.png',
    'https://s3.test/3.png',
  ];

  it('sends the first image right away so the click still counts as a gesture', () => {
    void saveImages(sources, '공지');

    expect(clicked).toEqual([sources[0]]);
  });

  it('staggers the rest instead of firing them at once', async () => {
    void saveImages(sources, '공지');

    await vi.advanceTimersByTimeAsync(300);
    expect(clicked).toEqual([sources[0], sources[1]]);

    await vi.advanceTimersByTimeAsync(300);
    expect(clicked).toEqual(sources);
  });
});
