import Swal from 'sweetalert2';

import { T } from '@/app/i18next';

export const WarningSwal = (t: T) => {
  return (text: string) =>
    Swal.fire({
      text,
      icon: 'warning',
      confirmButtonText: t('alertResponse.confirm'),
    });
};
