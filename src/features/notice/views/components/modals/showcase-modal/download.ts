export const fileNameOf = (src: string, fallback: string) => {
  const path = URL.canParse(src) ? new URL(src).pathname : src.split(/[?#]/)[0];
  const name = decodeURIComponent(path.split('/').filter(Boolean).pop() ?? '');
  return name || fallback;
};

const saveBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

/**
 * a[download] 는 cross-origin 주소에서 무시돼 저장 대신 이동해버린다.
 * blob 으로 받아 same-origin 으로 만든 뒤 저장한다. CORS 가 막혀 blob 을
 * 못 받는 경우에만 새 탭으로 여는 폴백을 쓴다.
 */
export const downloadImage = async (src: string, fallbackName: string) => {
  const response = await fetch(src);
  if (!response.ok)
    throw new Error(`failed to fetch image: ${response.status}`);
  saveBlob(await response.blob(), fileNameOf(src, fallbackName));
};

export const openInNewTab = (src: string) => {
  window.open(src, '_blank', 'noopener,noreferrer');
};
