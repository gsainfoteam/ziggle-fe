import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { chooseDialog } from '@/common/components';
import { api } from '@/common/lib';

import { BODY_MAX_LENGTH } from './use-handle-notice-submit';
import { ApiPaths } from '../../models';

export interface NoticeEditForm {
  noticeId: number;
  originalNotice: {
    content: string;
    enContent?: string;
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
  const router = useRouter();

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
        originalNotice.enContent && englishBody !== originalNotice.enContent && 'en',
      ].filter(Boolean) as ('ko' | 'en')[];

      const isEdited = !!editedLangs.length;
      const noticeLanguage = editedLangs.length === 1 ? editedLangs[0] : 'both';

      if (!koreanAdditionalContent && englishAdditionalContent) {
        toast.error(t('validations.korean_additional_required'));
        return;
      }

      if (deadline && deadline < new Date()) {
        toast.error(t('validations.deadline_invalid'));
        return;
      }

      if (isEdited) {
        // Validation for bodies if they are edited
        switch (noticeLanguage) {
          case 'ko':
            if (!koreanBody) {
              toast.error(t('validations.body_required'));
              return;
            }
            if (koreanBody.length > BODY_MAX_LENGTH) {
              toast.error(
                t('validations.body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: koreanBody.length, maxLength: BODY_MAX_LENGTH }),
              );
              return;
            }
            break;
          case 'en':
            if (!englishBody) {
              toast.error(t('validations.body_required'));
              return;
            }
            if (englishBody.length > BODY_MAX_LENGTH) {
              toast.error(
                t('validations.body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: englishBody.length, maxLength: BODY_MAX_LENGTH }),
              );
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
            if (koreanBody && koreanBody.length > BODY_MAX_LENGTH && englishBody && englishBody.length > BODY_MAX_LENGTH) {
              toast.error(
                t('validations.both_body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: koreanBody.length, maxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: englishBody.length, maxLength: BODY_MAX_LENGTH }),
              );
              return;
            } else if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
              toast.error(
                t('validations.korean_body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: koreanBody.length, maxLength: BODY_MAX_LENGTH }),
              );
              return;
            } else if (englishBody && englishBody.length > BODY_MAX_LENGTH) {
              toast.error(
                t('validations.english_body_too_long', { bodyMaxLength: BODY_MAX_LENGTH }) +
                  t('validations.char_count', { length: englishBody.length, maxLength: BODY_MAX_LENGTH }),
              );
              return;
            }
            break;
        }
      }

      const loading = toast.loading(t('toasts.modifying'));

      // 1. Update existing notice if edited and not timed out
      if (!hasTimedOut && isEdited) {
        const koreanNotice =
          noticeLanguage === 'ko' || noticeLanguage === 'both'
            ? await api
                .PATCH(ApiPaths.NoticeController_updateNotice, {
                  params: { path: { id: noticeId } },
                  body: { deadline: deadline?.toISOString(), body: koreanBody!, lng: 'ko' },
                })
                .then((res) => res.data)
                .catch(() => null)
            : { id: null };

        const englishNotice =
          noticeLanguage === 'en' || noticeLanguage === 'both'
            ? await api
                .PATCH(ApiPaths.NoticeController_updateNotice, {
                  params: { path: { id: noticeId } },
                  body: { deadline: deadline?.toISOString(), body: englishBody!, lng: 'en' },
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
      const isEnglishAttached = originalNotice.enContent === undefined && !!englishBody;
      if (isEnglishAttached) {
        const englishNotice = await api
          .POST(ApiPaths.NoticeController_addForeignContent, {
            params: { path: { id: noticeId, contentIdx: 1 } },
            body: {
              lang: 'en',
              title: enTitle || '',
              deadline: deadline ? deadline.toISOString() : undefined,
              body: englishBody!,
            },
          })
          .then((res) => res.data)
          .catch(() => null);

        if (!englishNotice) {
          toast.dismiss(loading);
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
            description: t('toasts.additional_notice_fail'),
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
        if (Array.isArray(contents) && contents.at(-1)?.id && englishAdditionalContent) {
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
              description: t('toasts.international_additional_fail'),
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
      router.navigate({ to: '/notice/$id', params: { id: noticeId.toString() } });
      
      return noticeId;
    },
  });
};
