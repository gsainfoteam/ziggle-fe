import { fallbackLng } from '@/app/i18next/settings';

import LoadingCatAnimation from '.';

export default {
  title: 'templates/LoadingCatAnimation',
  component: LoadingCatAnimation,
};

export const Default = () => <LoadingCatAnimation lng={fallbackLng} />;
