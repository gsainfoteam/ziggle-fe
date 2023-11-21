import {} from '@/app/i18next/client';
import { fallbackLng } from '@/app/i18next/settings';

import Navbar from '.';

export default {
  title: 'temlates/Navbar',
  component: Navbar,
};

export function Default() {
  return <Navbar lng={fallbackLng} />;
}
