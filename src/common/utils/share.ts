import { isMobile } from './user-agent';

export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'unsupported';

/**
 * 모바일: OS 네이티브 공유 시트.
 * 데스크탑: 링크 복사 (macOS Chrome/Safari의 navigator.share 시트 위치가 불안정함).
 */
export async function shareOrCopy({
  title,
  text,
  url,
  copyText = url,
}: {
  title: string;
  text: string;
  url: string;
  copyText?: string;
}): Promise<ShareResult> {
  const data = { title, text, url };

  if (isMobile() && typeof navigator.share === 'function') {
    try {
      if (!navigator.canShare || navigator.canShare(data)) {
        await navigator.share(data);
        return 'shared';
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled';
      }
    }
  }

  if (!navigator.clipboard?.writeText) return 'unsupported';

  try {
    await navigator.clipboard.writeText(copyText);
    return 'copied';
  } catch {
    return 'unsupported';
  }
}
