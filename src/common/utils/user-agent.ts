export const getUserAgent = () => window.navigator.userAgent;

export const isAndroid = () => /Android/i.test(getUserAgent());
export const isIos = () =>
  /iPhone|iPad|iPod/i.test(getUserAgent()) ||
  (/Macintosh/i.test(getUserAgent()) && navigator.maxTouchPoints > 1);
export const isMobile = () => isAndroid() || isIos();
