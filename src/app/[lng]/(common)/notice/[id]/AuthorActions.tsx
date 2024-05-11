'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import { deleteNotice } from '@/api/notice/notice';
import { PropsWithLng, PropsWithT, T } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddIcon from '@/assets/icons/add.svg';
import EditIcon from '@/assets/icons/edit-pencil.svg';
import RemoveIcon from '@/assets/icons/remove-outlined.svg';

interface WriterActionsProps extends PropsWithLng {
  noticeId: number;
}

const AuthorActions = ({ noticeId, lng }: WriterActionsProps) => {
  const { t } = useTranslation(lng);
  const router = useRouter();

  const handleRemoveNotice = ({
    noticeId,
    t,
  }: { noticeId: number } & PropsWithT) => {
    Swal.fire({
      text: t('zabo.authorActions.removeSure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('alertResponse.confirm'),
      cancelButtonText: t('alertResponse.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotice(noticeId)
          .then(() => {
            router.push(`/${lng}`);
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
    <div className="flex w-full gap-6 ">
      <div
        className="group flex cursor-pointer items-center gap-2 rounded-md"
        onClick={() => {
          handleRemoveNotice({ noticeId, t });
        }}
      >
        <RemoveIcon className="w-5 stroke-greyDark group-hover:stroke-primary" />
        <div className="text-base text-greyDark group-hover:text-primary">
          {t('zabo.authorActions.removeNotice')}
        </div>
      </div>

      <div className="group flex cursor-pointer items-center gap-2 rounded-md">
        <EditIcon className="stroke-greyDark group-hover:stroke-primary" />
        <div className="text-base text-greyDark group-hover:text-primary">
          {t('zabo.authorActions.editNotice')}
        </div>
      </div>

      <div className="group flex cursor-pointer items-center gap-2 rounded-md">
        <AddIcon className="w-5 fill-greyDark fill-primary stroke-greyDark group-hover:stroke-primary" />
        <div className="text-base text-greyDark group-hover:text-primary">
          {t('zabo.authorActions.writeAdditionalNotice')}
        </div>
      </div>
    </div>
  );
};

export default AuthorActions;
