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

export const saveImages = (sources: string[], baseName: string) => {
  sources.forEach((src, i) => {
    if (i === 0) return saveImage(src, `${baseName}-1`);
    setTimeout(() => saveImage(src, `${baseName}-${i + 1}`), i * STAGGER_MS);
  });
};
