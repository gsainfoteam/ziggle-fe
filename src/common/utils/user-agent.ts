export const getUserAgent = () => window.navigator.userAgent;

export const isAndroid = () => /Android/i.test(getUserAgent());
export const isIos = () => /iPhone|iPad|iPod/i.test(getUserAgent());
export const isMobile = () => isAndroid() || isIos();
