import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { chooseDialog } from '@/common/components';
import { api } from '@/common/lib';
import { invalidateNoticeQueries } from '@/features/notice/viewmodels';

import { ApiPaths } from '../../models';

export interface NoticeEditForm {
  noticeId: number;
  originalNotice: {
    content: string;
    enContent?: string;
    deadline?: string;
  };
  koreanBody: string;
  englishBody?: string;
  enTitle?: string;
  deadline?: Date;
  koreanAdditionalContent?: string;
  englishAdditionalContent?: string;
  hasTimedOut: boolean;
}

export const useHandleNoticeEdit = () => {
  const { t } = useTranslation('write');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      noticeId,
      originalNotice,
      koreanBody,
      englishBody,
      enTitle,
      deadline,
      koreanAdditionalContent,
      englishAdditionalContent,
      hasTimedOut,
    }: NoticeEditForm) => {
      const editedLangs: ('ko' | 'en')[] = [
        koreanBody !== originalNotice.content && 'ko',
        originalNotice.enContent &&
          englishBody !== originalNotice.enContent &&
          'en',
      ].filter(Boolean) as ('ko' | 'en')[];

      const isDeadlineEdited =
        deadline?.toISOString() !== originalNotice.deadline;
      const isEdited = !!editedLangs.length || isDeadlineEdited;

      const loading = toast.loading(t('toasts.modifying'));

      // 1. Update existing notice if edited and not timed out
      if (!hasTimedOut && isEdited) {
        // Patch Korean if body changed or deadline changed (Korean is always present)
        const patchKorean =
          editedLangs.includes('ko') ||
          isDeadlineEdited ||
          editedLangs.length === 0;
        const patchEnglish =
          editedLangs.includes('en') ||
          (isDeadlineEdited && !!originalNotice.enContent);

        const koreanNotice = patchKorean
          ? await api
              .PATCH(ApiPaths.NoticeController_updateNotice, {
                params: { path: { id: noticeId } },
                body: {
                  deadline: deadline?.toISOString(),
                  body: koreanBody,
                  lng: 'ko',
                },
              })
              .then((res) => res.data)
              .catch(() => null)
          : { id: null };

        const englishNotice = patchEnglish
          ? await api
              .PATCH(ApiPaths.NoticeController_updateNotice, {
                params: { path: { id: noticeId } },
                body: {
                  deadline: deadline?.toISOString(),
                  body: englishBody!,
                  lng: 'en',
                },
              })
              .then((res) => res.data)
              .catch(() => null)
          : { id: null };

        if (!koreanNotice || !englishNotice) {
          toast.dismiss(loading);
          toast.error(t('toasts.modify_fail'));
          return;
        }
      }

      // 2. Attach English if newly added
      const isEnglishAttached =
        originalNotice.enContent === undefined && !!englishBody;
      if (isEnglishAttached) {
        const englishNotice = await api
          .POST(ApiPaths.NoticeController_addForeignContent, {
            params: { path: { id: noticeId, contentIdx: 1 } },
            body: {
              lang: 'en',
              title: enTitle?.trim() || undefined,
              deadline: deadline ? deadline.toISOString() : undefined,
              body: englishBody!,
            },
          })
          .then((res) => res.data)
          .catch(() => null);

        if (!englishNotice) {
          toast.dismiss(loading);
          const result = await chooseDialog({
            title: t('toasts.international_fail.title'),
            description: t('toasts.international_fail.description'),
            denyLabel: t('toasts.copy_english'),
          });
          if (result.outcome === 'denied' && englishBody) {
            try {
              await navigator.clipboard.writeText(englishBody);
              toast.success(t('toasts.copy_success'));
            } catch {
              toast.error(t('toasts.copy_fail'));
            }
          }
          return;
        }
      }

      // 3. Attach additional content
      const isAdditionalAttached = !!koreanAdditionalContent;
      if (isAdditionalAttached) {
        const additionalKoreanNotice = await api
          .POST(ApiPaths.NoticeController_createAdditionalNotice, {
            params: { path: { id: noticeId } },
            body: {
              body: koreanAdditionalContent ?? '',
              deadline: deadline ? deadline.toISOString() : undefined,
            },
          })
          .then((res) => res.data)
          .catch(() => null);

        if (additionalKoreanNotice === null) {
          toast.dismiss(loading);
          const result = await chooseDialog({
            title: t('toasts.additional_notice_fail.title'),
            description: t('toasts.additional_notice_fail.description'),
            denyLabel: t('toasts.copy_additional'),
          });
          if (result.outcome === 'denied' && koreanAdditionalContent) {
            try {
              await navigator.clipboard.writeText(koreanAdditionalContent);
              toast.success(t('toasts.copy_success'));
            } catch {
              toast.error(t('toasts.copy_fail'));
            }
          }
          return;
        }

        const contents = additionalKoreanNotice?.additionalContents;
        if (
          Array.isArray(contents) &&
          contents.at(-1)?.id &&
          englishAdditionalContent
        ) {
          const additionalEnglishNotice = await api
            .POST(ApiPaths.NoticeController_addForeignContent, {
              params: {
                path: { id: noticeId, contentIdx: contents.at(-1)!.id },
              },
              body: {
                title: '',
                body: englishAdditionalContent,
                lang: 'en',
                deadline: deadline ? deadline.toISOString() : undefined,
              },
            })
            .catch(() => null);

          if (additionalEnglishNotice === null) {
            toast.dismiss(loading);
            const result = await chooseDialog({
              title: t('toasts.international_additional_fail.title'),
              description: t(
                'toasts.international_additional_fail.description',
              ),
              denyLabel: t('toasts.copy_international_additional'),
            });
            if (result.outcome === 'denied' && englishAdditionalContent) {
              try {
                await navigator.clipboard.writeText(englishAdditionalContent);
                toast.success(t('toasts.copy_success'));
              } catch {
                toast.error(t('toasts.copy_fail'));
              }
            }
            return;
          }
        }
      }

      toast.dismiss(loading);
      toast.success(t('toasts.modify_success'));

      localStorage.removeItem('notice');
      await invalidateNoticeQueries(queryClient);
      await navigate({
        to: '/notice/$id',
        params: { id: noticeId.toString() },
      });

      return noticeId;
    },
  });
};
