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
    if (runsOnServerSide && lng && activeLng !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, activeLng, i18n]);

  useEffect(() => {
    if (runsOnServerSide) return;
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  });

  return ret;
}
