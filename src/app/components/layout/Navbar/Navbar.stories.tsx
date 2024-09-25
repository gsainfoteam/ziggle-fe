import { fallbackLng } from '@/app/i18next/settings';
import {} from '@/app/i18next/client';

import Navbar from '.';

export default {
  title: 'layout/Navbar',
  component: Navbar,
};

export function Default() {
  return <Navbar lng={fallbackLng} />;
}
