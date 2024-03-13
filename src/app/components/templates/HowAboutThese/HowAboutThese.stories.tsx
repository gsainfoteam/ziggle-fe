import { fallbackLng } from '@/app/i18next/settings';

import HowAboutThese from '.';

export default {
  title: 'templates/HowAboutThese',
  component: HowAboutThese,
};

export const Default = () => <HowAboutThese lng={fallbackLng} />;
