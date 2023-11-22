'use client';

import i18next, { DefaultNamespace, KeyPrefix, Namespace } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
} from 'react-i18next';

import {
  cookieName,
  fallbackLng,
  getOptions,
  languages,
  Locale,
} from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation<
  Ns extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<Ns> = undefined,
>(lng: Locale, ns?: Namespace, options?: UseTranslationOptions<TKPrefix>) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, { lng, ...options });

  useEffect(() => {
    if (!lng || cookies[cookieName] === lng) return;
    setCookie(cookieName, lng, { path: '/' });
  }, [lng, cookies, setCookie]);

  return ret;
}
