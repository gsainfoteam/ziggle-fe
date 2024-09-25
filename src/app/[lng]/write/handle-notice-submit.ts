import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { uploadImages } from '@/api/image/image';
import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { attachInternationalNotice, createNotice } from '@/api/notice/notice';
import { Category } from '@/api/notice/notice';
import { createTag, getOneTag } from '@/api/tag/tag';
import { T } from '@/app/i18next';
import { WarningSwal } from '@/app/[lng]/write/swals';

type NoticeLanguage = 'ko' | 'en' | 'both';

interface NoticeSubmitForm {
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

const handleNoticeSubmit = async ({
  title,
  enTitle,
  deadline,
  noticeLanguage,
  koreanBody,
  englishBody,
  tags,
  images,
  category,
  t,
}: NoticeSubmitForm & { t: T }) => {
  sendLog(LogEvents.noticeWritingPageClickSubmit);

  const TITLE_MAX_LENGTH = 50;
  const BODY_MAX_LENGTH = 20000;

  const warningSwal = WarningSwal(t);

  if (!title) {
    warningSwal(t('write.alerts.title'));
    return;
  }

  if (noticeLanguage === 'both' && !enTitle) {
    warningSwal(t('write.alerts.enTitle'));
    return;
  }

  if (title.length > TITLE_MAX_LENGTH) {
    warningSwal(
      t('write.alerts.titleLengthLessThan', {
        titleMaxLength: TITLE_MAX_LENGTH,
      }),
    );
    return;
  }

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

  const tagIds: number[] | undefined = await handleTagSubmit(tags, t);
  if (!tagIds) return;

  const imageKeys = await uploadImages(images).catch(() => null);
  if (!imageKeys) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  const notice = await createNotice({
    title,
    deadline,
    body: koreanBody!,
    images: imageKeys,
    tags: tagIds,
    category,
  }).catch(() => null);

  if (!notice) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  const { id, additionalContents } = notice;

  if (!id) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  if (noticeLanguage === 'both') {
    const noticeWithInternational = await attachInternationalNotice({
      lang: 'en',
      title: enTitle || title,
      deadline,
      body: englishBody!,
      noticeId: id,
      contentId: 1,
    }).catch(() => null);

    if (!noticeWithInternational) {
      Swal.fire({
        text: t('write.alerts.attachInternationalFail'),
        icon: 'error',
        confirmButtonText: t('alertResponse.confirm'),
        showDenyButton: true,
        denyButtonText: t('write.alerts.copyEnglishContent'),
      }).then((result) => {
        if (result.isDenied) {
          navigator.clipboard.writeText(englishBody!);
          toast.success(t('write.alerts.copySuccess'));
        }
      });
      return;
    }
  }

  Swal.fire({
    text: t('write.alerts.submitSuccess'),
    icon: 'success',
    confirmButtonText: t('alertResponse.confirm'),
  });

  return id;
};

const handleTagSubmit = async (tags: string[], t: T) => {
  const tagIds: number[] = [];

  for (const tagName of tags) {
    const searchedTag = await getOneTag(tagName);

    if (!searchedTag) {
      const createdTag = await createTag(tagName);

      if (!createdTag) {
        Swal.fire({
          text: t('write.alerts.tagCreationFail'),
          icon: 'error',
          confirmButtonText: t('alertResponse.confirm'),
        });
        return;
      }

      tagIds.push(createdTag.id);
    } else {
      tagIds.push(searchedTag.id);
    }
  }

  return tagIds;
};

export default handleNoticeSubmit;
