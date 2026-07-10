import { Link, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { EditPencil, Trash } from 'iconoir-react';
import { LogClick, confirmDialog } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useDeleteNotice } from '@/features/notice/viewmodels';

interface WriterActionsProps {
  noticeId: number;
}

export const NoticeDetailAuthorActions = ({ noticeId }: WriterActionsProps) => {
  const { t } = useTranslation('notice');
  const router = useRouter();
  const { mutateAsync: deleteNotice, isPending } = useDeleteNotice();

  const handleRemoveNotice = async () => {
    const confirmed = await confirmDialog({
      description: t('detail.author_actions.remove_confirm'),
      destructive: true,
    });
    if (!confirmed) return;

    try {
      await deleteNotice({ params: { path: { id: noticeId } } });
      router.navigate({ to: '/home' });
      toast.success(t('detail.author_actions.toasts.delete_success'));
    } catch (error) {
      console.error(error);
      toast.error(t('detail.author_actions.toasts.delete_fail'));
    }
  };

  return (
    <div className="flex gap-2">
      <LogClick
        eventName={LogEvents.detailClickEdit}
        properties={{ id: noticeId }}
      >
        <Link
          to="/write"
          search={{ noticeId }}
          className="border-greyLight text-greyDark dark:text-dark_grey dark:border-dark_greyBorder hover:bg-greyLight dark:hover:bg-dark_greyDark flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition"
        >
          <EditPencil className="size-4" />
          {t('detail.author_actions.edit')}
        </Link>
      </LogClick>

      <LogClick
        eventName={LogEvents.detailClickRemove}
        properties={{ id: noticeId }}
      >
        <button
          className={cn(
            'flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950',
            isPending && 'cursor-not-allowed opacity-50',
          )}
          onClick={handleRemoveNotice}
          disabled={isPending}
        >
          <Trash className="size-4" />
          {t('detail.author_actions.remove')}
        </button>
      </LogClick>
    </div>
  );
};
