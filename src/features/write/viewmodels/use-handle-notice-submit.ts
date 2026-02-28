import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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
  groupId: string | null;
}

export const TITLE_MAX_LENGTH = 50;
export const BODY_MAX_LENGTH = 20000;

export const useHandleNoticeSubmit = () => {
  const { t } = useTranslation('notice');

  const handleTagSubmit = async (tags: string[]) => {
    const tagIds: number[] = [];

    for (const tagName of tags) {
      const searchedTag = await api
        .GET(ApiPaths.TagController_findAll, {
          params: { query: { name: tagName } },
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
          toast.error(t('write.alerts.tagCreationFail'));
          return;
        }

        tagIds.push(createdTag.id);
      } else {
        tagIds.push(searchedTag.id);
      }
    }

    return tagIds;
  };

  return async ({
    title,
    enTitle,
    deadline,
    noticeLanguage,
    koreanBody,
    englishBody,
    tags,
    images,
    category,
    groupId,
  }: NoticeSubmitForm) => {
    if (!title) {
      toast.error(t('write.alerts.title'));
      return;
    }

    if (noticeLanguage === 'both' && !enTitle) {
      toast.error(t('write.alerts.enTitle'));
      return;
    }

    if (title.length > TITLE_MAX_LENGTH) {
      toast.error(
        t('write.alerts.titleLengthLessThan', {
          titleMaxLength: TITLE_MAX_LENGTH,
        }),
      );
      return;
    }

    if (deadline && deadline < new Date()) {
      toast.error(t('write.alerts.deadline'));
      return;
    }

    switch (noticeLanguage) {
      case 'ko':
        if (!koreanBody) {
          toast.error(t('write.alerts.body'));
          return;
        }
        break;
      case 'en':
        if (!englishBody) {
          toast.error(t('write.alerts.body'));
          return;
        }
        break;
      case 'both':
        if (!koreanBody && !englishBody) {
          toast.error(t('write.alerts.body'));
          return;
        }
        if (!koreanBody && englishBody) {
          toast.error(t('write.alerts.koreanBody'));
          return;
        }
        if (koreanBody && !englishBody) {
          toast.error(t('write.alerts.englishBody'));
          return;
        }
        break;
    }

    switch (noticeLanguage) {
      case 'ko':
        if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
          toast.error(
            t('write.alerts.bodyLengthLessThan', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
              t('write.alerts.numberOfCharacter', {
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
            t('write.alerts.bodyLengthLessThan', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
              t('write.alerts.numberOfCharacter', {
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
            t('write.alerts.bothBodyLengthLessThan', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
              t('write.alerts.numberOfCharacter', {
                length: koreanBody.length,
                maxLength: BODY_MAX_LENGTH,
              }) +
              t('write.alerts.numberOfCharacter', {
                length: englishBody.length,
                maxLength: BODY_MAX_LENGTH,
              }),
          );
          return;
        } else if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
          toast.error(
            t('write.alerts.koreanBodyLengthLessThan', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
              t('write.alerts.numberOfCharacter', {
                length: koreanBody.length,
                maxLength: BODY_MAX_LENGTH,
              }),
          );

          return;
        } else if (englishBody && englishBody.length > BODY_MAX_LENGTH) {
          toast.error(
            t('write.alerts.englishBodyLengthLessThan', {
              bodyMaxLength: BODY_MAX_LENGTH,
            }) +
              t('write.alerts.numberOfCharacter', {
                length: englishBody.length,
                maxLength: BODY_MAX_LENGTH,
              }),
          );

          return;
        }
        break;
    }

    const loading = toast.loading(t('write.alerts.submittingNotice'));

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
      toast.error(t('write.alerts.submitFail'));
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
          groupId: groupId ?? undefined,
        },
      })
      .then((res) => res.data)
      .catch(() => null);

    if (!notice) {
      toast.dismiss(loading);
      toast.error(t('write.alerts.submitFail'));
      return;
    }

    const { id } = notice;

    if (!id) {
      toast.dismiss(loading);
      toast.error(t('write.alerts.submitFail'));
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
        // TODO: add alert
        // Swal.fire({
        //   text: t('write.alerts.attachInternationalFail'),
        //   icon: 'error',
        //   confirmButtonText: t('alertResponse.confirm'),
        //   showDenyButton: true,
        //   denyButtonText: t('write.alerts.copyEnglishContent'),
        // }).then((result) => {
        //   if (result.isDenied) {
        //     navigator.clipboard.writeText(englishBody!);
        //     toast.success(t('write.alerts.copySuccess'));
        //   }
        // });
        // return;
      }
    }

    toast.dismiss(loading);
    toast.success(t('write.alerts.submitSuccess'));

    return id;
  };
};
