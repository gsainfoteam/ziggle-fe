import { fallbackLng } from '@/app/i18next/settings';

import HowAboutThese from '.';

export default {
  title: 'temlates/HowAboutThese',
  component: HowAboutThese,
};

export const Default = () => <HowAboutThese lng={fallbackLng} />;
