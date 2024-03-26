import { useTranslation } from '@/app/i18next/client';
import { fallbackLng } from '@/app/i18next/settings';

import Footer from '.';

export default {
  title: 'templates/Footer',
  component: Footer,
};

export const Default = () => {
  const { t } = useTranslation(fallbackLng);
  return <Footer t={t} />;
};
