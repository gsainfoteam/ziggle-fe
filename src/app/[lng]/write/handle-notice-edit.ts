import Swal from 'sweetalert2';

import { updateNotice } from '@/api/notice/notice';
import { WarningSwal } from '@/app/[lng]/write/swals';
import { T } from '@/app/i18next';

type NoticeLanguage = 'ko' | 'en' | 'both';

interface NoticeSubmitForm {
  noticeId: number;
  deadline?: Date;
  noticeLanguage: NoticeLanguage;
  koreanBody?: string;
  englishBody?: string;
}

const handleNoticeEdit = async ({
  noticeId,
  deadline,
  noticeLanguage,
  koreanBody,
  englishBody,
  t,
}: NoticeSubmitForm & { t: T }) => {
  const TITLE_MAX_LENGTH = 50;
  const BODY_MAX_LENGTH = 20000;

  const warningSwal = WarningSwal(t);

  if (deadline && deadline < new Date()) {
    warningSwal(t('write.alerts.deadline'));
    return;
  }

  switch (noticeLanguage) {
    case 'ko':
      if (!koreanBody) {
        warningSwal(t('write.alerts.body'));
        return;
      }
      break;
    case 'en':
      if (!englishBody) {
        warningSwal(t('write.alerts.body'));
        return;
      }
      break;
    case 'both':
      if (!koreanBody && !englishBody) {
        warningSwal(t('write.alerts.body'));
        return;
      }
      if (!koreanBody && englishBody) {
        warningSwal(t('write.alerts.koreanBody'));
        return;
      }
      if (koreanBody && !englishBody) {
        warningSwal(t('write.alerts.englishBody'));
        return;
      }
      break;
  }

  switch (noticeLanguage) {
    case 'ko':
      if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
        warningSwal(
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
        warningSwal(
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
        warningSwal(
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
        warningSwal(
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
        warningSwal(
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

  Swal.fire({
    text: t('write.alerts.submittingNotice'),
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const koreanNotice =
    noticeLanguage === 'ko' || noticeLanguage === 'both'
      ? await updateNotice({
          noticeId,
          deadline,
          body: koreanBody!,
          lng: 'ko',
        }).catch(() => null)
      : undefined;

  const englishNotice =
    noticeLanguage === 'en' || noticeLanguage === 'both'
      ? await updateNotice({
          noticeId,
          deadline,
          body: englishBody!,
          lng: 'en',
        }).catch(() => null)
      : undefined;

  if (!koreanNotice || !englishNotice) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  Swal.fire({
    text: t('write.alerts.submitSuccess'),
    icon: 'success',
    confirmButtonText: t('alertResponse.confirm'),
  });

  return koreanNotice?.id || englishNotice?.id;
};

export default handleNoticeEdit;
