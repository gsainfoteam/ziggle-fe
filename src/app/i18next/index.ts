import {
  createInstance,
  Namespace,
  TFunction,
  KeyPrefix,
  DefaultNamespace,
} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { Locale, getOptions } from './settings';

import type translation from '@/app/i18next/locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof translation;
    };
  }
}

const initI18next = async (lng: Locale, ns: Namespace) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation<
  Ns extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<Ns> = undefined,
>(
  lng: Locale,
  ns: Ns,
  options = {
    keyPrefix: undefined as TKPrefix,
  },
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ) as T<Ns, TKPrefix>,
    i18n: i18nextInstance,
  };
}

export type T<
  Ns extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<Ns> = undefined,
> = TFunction<Ns, TKPrefix>;
