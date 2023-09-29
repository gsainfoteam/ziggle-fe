import { useTranslation } from '@/app/i18next/client';
import Footer from '.';

export default {
  title: 'temlates/Footer',
  component: Footer,
};

export const Default = () => {
  const { t } = useTranslation();
  return <Footer t={t} />;
};
