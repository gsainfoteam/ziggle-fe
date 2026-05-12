import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { chooseDialog, alertDialog } from '@/common/components';
import { api } from '@/common/lib';
import { ApiPaths, type Category } from '@/features/notice/models';

type NoticeLanguage = 'ko' | 'en' | 'both';

export interface NoticeSubmitForm {
  title?: string;
  enTitle?: string;
  deadline?: Date;
  noticeLanguage: NoticeLanguage;
  koreanBody?: string;
  englishBody?: string;
  tags: string[];
  images: File[];
  category: (typeof Category)[keyof typeof Category];
}

export const TITLE_MAX_LENGTH = 50;
export const BODY_MAX_LENGTH = 20000;

export const useHandleNoticeSubmit = () => {
  const { t } = useTranslation('write');
  const router = useRouter();

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
      await alertDialog({ description: t('toasts.push_delayed') });
      if (!title) {
        toast.error(t('validations.title_required'));
        return;
      }

      if (noticeLanguage === 'both' && !enTitle) {
        toast.error(t('validations.english_title_required'));
        return;
      }

      if (title.length > TITLE_MAX_LENGTH) {
        toast.error(
          t('validations.title_too_long', {
            titleMaxLength: TITLE_MAX_LENGTH,
          }),
        );
        return;
      }

      if (deadline && deadline < new Date()) {
        toast.error(t('validations.deadline_invalid'));
        return;
      }

      switch (noticeLanguage) {
        case 'ko':
          if (!koreanBody) {
            toast.error(t('validations.body_required'));
            return;
          }
          break;
        case 'en':
          if (!englishBody) {
            toast.error(t('validations.body_required'));
            return;
          }
          break;
        case 'both':
          if (!koreanBody && !englishBody) {
            toast.error(t('validations.body_required'));
            return;
          }
          if (!koreanBody && englishBody) {
            toast.error(t('validations.korean_body_required'));
            return;
          }
          if (koreanBody && !englishBody) {
            toast.error(t('validations.english_body_required'));
            return;
          }
          break;
      }

      switch (noticeLanguage) {
        case 'ko':
          if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
            toast.error(
              t('validations.body_too_long', {
                bodyMaxLength: BODY_MAX_LENGTH,
              }) +
                t('validations.char_count', {
                  length: koreanBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }),
            );
            return;
          }
          break;
        case 'en':
          if (englishBody && englishBody.length > BODY_MAX_LENGTH) {
            toast.error(
              t('validations.body_too_long', {
                bodyMaxLength: BODY_MAX_LENGTH,
              }) +
                t('validations.char_count', {
                  length: englishBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }),
            );
            return;
          }
          break;
        case 'both':
          if (
            koreanBody &&
            koreanBody.length > BODY_MAX_LENGTH &&
            englishBody &&
            englishBody.length > BODY_MAX_LENGTH
          ) {
            toast.error(
              t('validations.both_body_too_long', {
                bodyMaxLength: BODY_MAX_LENGTH,
              }) +
                t('validations.char_count', {
                  length: koreanBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }) +
                t('validations.char_count', {
                  length: englishBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }),
            );
            return;
          } else if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
            toast.error(
              t('validations.korean_body_too_long', {
                bodyMaxLength: BODY_MAX_LENGTH,
              }) +
                t('validations.char_count', {
                  length: koreanBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }),
            );

            return;
          } else if (englishBody && englishBody.length > BODY_MAX_LENGTH) {
            toast.error(
              t('validations.english_body_too_long', {
                bodyMaxLength: BODY_MAX_LENGTH,
              }) +
                t('validations.char_count', {
                  length: englishBody.length,
                  maxLength: BODY_MAX_LENGTH,
                }),
            );

            return;
          }
          break;
      }

      const loading = toast.loading(t('toasts.submitting'));

      const tagIds: number[] | undefined = await handleTagSubmit(tags);
      if (!tagIds) return;

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
            title,
            deadline: deadline?.toISOString(),
            body: koreanBody!,
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
              lang: 'en' as const,
              title: enTitle || title,
              deadline: deadline?.toISOString(),
              body: englishBody!,
            },
          })
          .catch(() => null);

        if (!noticeWithInternational) {
          const result = await chooseDialog({
            description: t('toasts.international_fail'),
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
      toast.success(t('toasts.submit_success'));
      localStorage.removeItem('notice');
      router.navigate({ to: '/notice/$id', params: { id: id.toString() } });

      return id;
    },
  });
};
