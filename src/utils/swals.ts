import Swal from 'sweetalert2';

import { T } from '@/app/i18next';

export const WarningSwal = (text: string, t: T) => {
  Swal.fire({
    text,
    icon: 'warning',
    confirmButtonText: t('alertResponse.confirm'),
  });
};
