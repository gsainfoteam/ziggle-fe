import { Link, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import EditPencilIcon from '@/assets/icons/edit-pencil.svg?react';
import RemoveIcon from '@/assets/icons/remove.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

interface WriterActionsProps {
  noticeId: number;
}

export const AuthorActions = ({ noticeId }: WriterActionsProps) => {
  const { t } = useTranslation('notice');
  const router = useRouter();

  const handleRemoveNotice = () => {
    // TODO: implement remove notice
    // Swal.fire({
    //   text: t('zabo.authorActions.removeSure'),
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: t('alertResponse.confirm'),
    //   cancelButtonText: t('alertResponse.cancel'),
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     deleteNotice(noticeId)
    //       .then((e) => {
    //         router.push(`/home`);
    //         Swal.fire({
    //           text: t('write.alerts.deleteSuccess'),
    //           icon: 'success',
    //           confirmButtonText: t('alertResponse.confirm'),
    //         });
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         Swal.fire({
    //           text: t('write.alerts.deleteFail'),
    //           icon: 'error',
    //           confirmButtonText: t('alertResponse.confirm'),
    //         });
    //       });
    //   }
    // });
  };

  return (
    <div className={'flex gap-6'}>
      <LogClick
        eventName={LogEvents.detailClickEdit}
        properties={{ id: noticeId }}
      >
        <Link
          to="/write"
          search={{ noticeId }}
          className={'flex items-center gap-[10px]'}
        >
          <EditPencilIcon
            className={'stroke-greyDark dark:stroke-dark_white w-5'}
          />
          <p className={'text-greyDark'}>{t('zabo.authorActions.edit')}</p>
        </Link>
      </LogClick>

      <LogClick
        eventName={LogEvents.detailClickRemove}
        properties={{ id: noticeId }}
      >
        <button
          className={'flex items-center gap-[10px]'}
          onClick={handleRemoveNotice}
        >
          <RemoveIcon
            className={'stroke-greyDark dark:stroke-dark_white w-5'}
          />
          <p className={'text-greyDark'}>{t('zabo.authorActions.remove')}</p>
        </button>
      </LogClick>
    </div>
  );
};
