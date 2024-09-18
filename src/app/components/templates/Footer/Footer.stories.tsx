import { fallbackLng } from '@/app/i18next/settings';

import Footer from '.';

export default {
  title: 'templates/Footer',
  component: Footer,
};

export const Default = () => {
  return <Footer lng={fallbackLng} />;
};
