import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/common/lib';

import { BODY_MAX_LENGTH } from './use-handle-notice-submit';
import { ApiPaths } from '../models';

export const useHandleNoticeEdit = () => {
  const { t } = useTranslation('write');

  return async ({
    noticeId,
    deadline,
    noticeLanguage,
    koreanBody,
    englishBody,
  }: {
    noticeId: number;
    deadline?: Date;
    noticeLanguage: 'ko' | 'en' | 'both';
    koreanBody?: string;
    englishBody?: string;
  }) => {
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

    const koreanNotice =
      noticeLanguage === 'ko' || noticeLanguage === 'both'
        ? await api
            .PATCH(ApiPaths.NoticeController_updateNotice, {
              params: { path: { id: noticeId } },
              body: {
                deadline: deadline?.toISOString(),
                body: koreanBody!,
                lng: 'ko',
              },
            })
            .then((res) => res.data)
            .catch(() => null)
        : { id: null };

    const englishNotice =
      noticeLanguage === 'en' || noticeLanguage === 'both'
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
      toast.error(t('toasts.submit_fail'));
      return;
    }

    toast.dismiss(loading);
    toast.success(t('toasts.submit_success'));

    return koreanNotice?.id || englishNotice?.id;
  };
};
