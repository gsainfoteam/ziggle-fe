import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { chooseDialog, alertDialog } from '@/common/components';
import { api } from '@/common/lib';
import { ApiPaths, type Category } from '@/features/notice/models';
import { invalidateNoticeQueries } from '@/features/notice/viewmodels';

export interface NoticeSubmitForm {
  title: string;
  enTitle?: string;
  deadline?: Date;
  noticeLanguage: 'ko' | 'both';
  koreanBody: string;
  englishBody?: string;
  tags: string[];
  images: File[];
  category: (typeof Category)[keyof typeof Category];
}

export const useHandleNoticeSubmit = () => {
  const { t } = useTranslation('write');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleTagSubmit = async (tags: string[]) => {
    const tagIds: number[] = [];

    for (const tagName of tags) {
      const searchedTag = await api
        .GET(ApiPaths.TagController_findOne, {
          params: { path: { name: tagName } },
        })
        .then((res) => res.data)
        .catch(() => null);

      if (!searchedTag) {
        const { data: createdTag } = await api.POST(
          ApiPaths.TagController_create,
          {
            body: { name: tagName },
          },
        );

        if (!createdTag) {
          toast.error(t('toasts.tag_creation_fail'));
          return;
        }

        tagIds.push(createdTag.id);
      } else {
        tagIds.push(searchedTag.id);
      }
    }

    return tagIds;
  };

  return useMutation({
    mutationFn: async ({
      title,
      enTitle,
      deadline,
      noticeLanguage,
      koreanBody,
      englishBody,
      tags,
      images,
      category,
    }: NoticeSubmitForm) => {
      const loading = toast.loading(t('toasts.submitting'));

      const tagIds: number[] | undefined = await handleTagSubmit(tags);
      if (!tagIds) {
        toast.dismiss(loading);
        return;
      }

      const imagesFormData = new FormData();
      for (const image of images) {
        imagesFormData.append('images', image);
      }
      const imageKeys =
        images.length > 0
          ? await api
              .POST(ApiPaths.ImageController_uploadImage, {
                // TODO: wrong type
                body: imagesFormData as never,
              })
              .then((res) => res.data)
              .catch(() => null)
          : [];
      if (!imageKeys) {
        toast.dismiss(loading);
        toast.error(t('toasts.submit_fail'));
        return;
      }

      const notice = await api
        .POST(ApiPaths.NoticeController_createNotice, {
          body: {
            title: title.trim(),
            deadline: deadline?.toISOString(),
            body: koreanBody,
            images: imageKeys,
            // TODO: wrong type
            tags: tagIds as unknown as string[],
            category,
          },
        })
        .then((res) => res.data)
        .catch(() => null);

      if (!notice) {
        toast.dismiss(loading);
        toast.error(t('toasts.submit_fail'));
        return;
      }

      const { id } = notice;

      if (!id) {
        toast.dismiss(loading);
        toast.error(t('toasts.submit_fail'));
        return;
      }

      if (noticeLanguage === 'both') {
        const noticeWithInternational = await api
          .POST(ApiPaths.NoticeController_addForeignContent, {
            params: { path: { id, contentIdx: 1 } },
            body: {
              lang: 'en',
              title: enTitle?.trim() || title.trim(),
              deadline: deadline?.toISOString(),
              body: englishBody!,
            },
          })
          .catch(() => null);

        if (!noticeWithInternational) {
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
        }
      }

      toast.dismiss(loading);
      await alertDialog({
        title: t('toasts.push_delayed.title'),
        description: t('toasts.push_delayed.description'),
      });
      toast.success(t('toasts.submit_success'));
      localStorage.removeItem('notice');
      invalidateNoticeQueries(queryClient);
      void navigate({ to: '/notice/$id', params: { id: id.toString() } });

      return id;
    },
  });
};
