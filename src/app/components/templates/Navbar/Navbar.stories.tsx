import { useTranslation } from '@/app/i18next/client';
import { fallbackLng, Locale } from '@/app/i18next/settings';

import Navbar from '.';

export default {
  title: 'temlates/Navbar',
  component: Navbar,
};

export function Default() {
  const { i18n } = useTranslation(fallbackLng);
  return <Navbar lng={i18n.language as Locale} />;
}
