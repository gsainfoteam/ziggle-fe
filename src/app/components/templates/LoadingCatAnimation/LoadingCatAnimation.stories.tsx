import { fallbackLng } from '@/app/i18next/settings';

import LoadingCatAnimation from '.';

export default {
  title: 'temlates/LoadingCatAnimation',
  component: LoadingCatAnimation,
};

export const Default = () => <LoadingCatAnimation lng={fallbackLng} />;
