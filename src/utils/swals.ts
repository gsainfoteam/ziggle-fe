import Swal from 'sweetalert2';

export const WarningSwal = (text: string) => {
  Swal.fire({
    text,
    icon: 'warning',
    confirmButtonText: t('alertResponse.confirm'),
  });
};
