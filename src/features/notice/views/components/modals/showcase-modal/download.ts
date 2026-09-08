import { delay } from 'es-toolkit';

export const fileNameOf = (src: string, fallback: string) => {
  const path = URL.canParse(src) ? new URL(src).pathname : src.split(/[?#]/)[0];
  const name = decodeURIComponent(path.split('/').filter(Boolean).pop() ?? '');
  return name || fallback;
};

export const saveImage = (src: string, fallbackName: string) => {
  const link = document.createElement('a');
  link.href = src;
  link.download = fileNameOf(src, fallbackName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const STAGGER_MS = 300;

export const saveImages = async (sources: string[], baseName: string) => {
  for (const [i, src] of sources.entries()) {
    if (i > 0) await delay(STAGGER_MS);
    saveImage(src, `${baseName}-${i + 1}`);
  }
};
