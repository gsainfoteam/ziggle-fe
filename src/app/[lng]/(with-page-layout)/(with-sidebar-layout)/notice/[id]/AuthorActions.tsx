'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { deleteNotice } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import EditPencilIcon from '@/assets/icons/edit-pencil.svg';
import RemoveIcon from '@/assets/icons/remove.svg';

interface WriterActionsProps {
  noticeId: number;
}

const AuthorActions = ({ noticeId, lng }: PropsWithLng<WriterActionsProps>) => {
  const { t } = useTranslation(lng);
  const router = useRouter();

  const handleRemoveNotice = () => {
    Swal.fire({
      text: t('zabo.authorActions.removeSure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('alertResponse.confirm'),
      cancelButtonText: t('alertResponse.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotice(noticeId)
          .then((e) => {
            router.push(`/home`);
            Swal.fire({
              text: t('write.alerts.deleteSuccess'),
              icon: 'success',
              confirmButtonText: t('alertResponse.confirm'),
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              text: t('write.alerts.deleteFail'),
              icon: 'error',
              confirmButtonText: t('alertResponse.confirm'),
            });
          });
      }
    });
  };

  return (
    <div className={'flex gap-6'}>
      <Link
        href={`/write?noticeId=${noticeId}`}
        className={'flex items-center gap-[10px]'}
      >
        <EditPencilIcon
          className={'w-5 stroke-greyDark dark:stroke-dark_white'}
        />
        <p className={'text-greyDark'}>{t('zabo.authorActions.edit')}</p>
      </Link>

      <button
        className={'flex items-center gap-[10px]'}
        onClick={handleRemoveNotice}
      >
        <RemoveIcon className={'w-5 stroke-greyDark dark:stroke-dark_white'} />
        <p className={'text-greyDark'}>{t('zabo.authorActions.remove')}</p>
      </button>
    </div>
  );
};

export default AuthorActions;
