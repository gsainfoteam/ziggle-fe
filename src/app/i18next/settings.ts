import type { Namespace } from 'i18next';
export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ko'] as const;
export type Locale = (typeof languages)[number];
export const defaultNS = 'translation';
export const cookieName = 'next-i18next';

export const getOptions = (lng = fallbackLng, ns: Namespace = defaultNS) => {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'small'],
    },
  };
};
