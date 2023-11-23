import Swal from 'sweetalert2';

import { uploadImages } from '@/api/image/image';
import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import {
  ATTACH_INTERNATIONAL_NOTICE,
  CREATE_NOTICE,
} from '@/api/notice/notice';
import { createTag, getOneTag } from '@/api/tag/tag';
import { T } from '@/app/i18next';
import { WarningSwal } from '@/utils/swals';

import { apolloClient } from '../InitClient';

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

  const tagIds: number[] | undefined = await handleTagSubmit(tags, t);
  if (!tagIds) return;

  Swal.fire({
    text: t('write.alerts.submittingNotice'),
    icon: 'info',
    showConfirmButton: false,
  });

  const imageKeys = await uploadImages(images);

  const notice = await apolloClient.mutate({
    mutation: CREATE_NOTICE,
    variables: {
      title,
      deadline,
      body: koreanBody!,
      images: imageKeys,
    },
  });

  if (!notice.data?.createNotice) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  const { id, contents } = notice.data?.createNotice;

  if (!id) {
    Swal.fire({
      text: t('write.alerts.submitFail'),
      icon: 'error',
      confirmButtonText: t('alertResponse.confirm'),
    });
    return;
  }

  if (noticeLanguage === 'both') {
    const englishNotice = await apolloClient.mutate({
      mutation: ATTACH_INTERNATIONAL_NOTICE,
      variables: {
        lang: 'en',
        title: enTitle || title,
        deadline,
        body: englishBody!,
        noticeId: id,
        contentId: contents[0].id,
      },
    });
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
