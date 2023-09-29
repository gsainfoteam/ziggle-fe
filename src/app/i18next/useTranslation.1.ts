'use client';
import { useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { Locale, cookieName } from './settings';
import { useEffect, useState } from 'react';
import { runsOnServerSide } from './client';

export function useTranslation(
  lng: Locale,
  ...args: Parameters<typeof useTranslationOrg>
) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(...args);
  const { i18n } = ret;
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (runsOnServerSide) return;
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [i18n, activeLng]);

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [i18n, lng]);

  useEffect(() => {
    if (cookies['next-i18next'] === lng) return;
    setCookie(cookieName, lng, { path: '/' });
  }, []);

  return ret;
}
