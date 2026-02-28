import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/common/lib';

import { BODY_MAX_LENGTH } from './use-handle-notice-submit';
import { ApiPaths } from '../models';

export const useHandleNoticeEdit = () => {
  const { t } = useTranslation('notice');

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
        : undefined;

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
        : undefined;

    if (!koreanNotice || !englishNotice) {
      toast.dismiss(loading);
      toast.error(t('write.alerts.submitFail'));
      return;
    }

    toast.dismiss(loading);
    toast.success(t('write.alerts.submitSuccess'));

    return koreanNotice?.id || englishNotice?.id;
  };
};
