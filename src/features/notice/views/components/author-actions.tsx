import { Link, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import EditPencilIcon from '@/assets/icons/edit-pencil.svg?react';
import RemoveIcon from '@/assets/icons/remove.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

import { useDeleteNotice } from '../../viewmodels';

interface WriterActionsProps {
  noticeId: number;
}

export const AuthorActions = ({ noticeId }: WriterActionsProps) => {
  const { t } = useTranslation('notice');
  const router = useRouter();
  const { mutateAsync: deleteNotice } = useDeleteNotice();

  const handleRemoveNotice = async () => {
    if (confirm(t('zabo.authorActions.removeSure'))) {
      try {
        await deleteNotice({ params: { path: { id: noticeId } } });
        router.navigate({ to: '/$category', params: { category: 'home' } });
        toast.success(t('write.alerts.deleteSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(t('write.alerts.deleteFail'));
      }
    }
  };

  return (
    <div className="flex gap-6">
      <LogClick
        eventName={LogEvents.detailClickEdit}
        properties={{ id: noticeId }}
      >
        <Link
          to="/write"
          search={{ noticeId }}
          className="flex items-center gap-[10px]"
        >
          <EditPencilIcon className="stroke-greyDark dark:stroke-dark_white w-5" />
          <p className="text-greyDark">{t('zabo.authorActions.edit')}</p>
        </Link>
      </LogClick>

      <LogClick
        eventName={LogEvents.detailClickRemove}
        properties={{ id: noticeId }}
      >
        <button
          className="flex items-center gap-[10px]"
          onClick={handleRemoveNotice}
        >
          <RemoveIcon className="stroke-greyDark dark:stroke-dark_white w-5" />
          <p className="text-greyDark">{t('zabo.authorActions.remove')}</p>
        </button>
      </LogClick>
    </div>
  );
};
