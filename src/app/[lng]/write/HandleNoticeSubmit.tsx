import Swal from 'sweetalert2';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { CREATE_NOTICE } from '@/api/notice/notice';
import { createTag, getOneTag } from '@/api/tag/tag';
import { T } from '@/app/i18next';

import { apolloClient } from '../InitClient';

type NoticeLanguage = 'ko' | 'en' | 'both';

interface NoticeSubmitForm {
  title?: string;
  deadline?: Date;
  noticeLanguage: NoticeLanguage;
  koreanBody?: string;
  englishBody?: string;
  tags: string[];
  images: File[];
}

const handleNoticeSubmit = async ({
  title,
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
  const BODY_MAX_LENGTH = 3000;

  const WarningSwal = (text: string) => {
    Swal.fire({
      text,
      icon: 'warning',
      confirmButtonText: '확인',
    });
  };

  if (!title) {
    WarningSwal(t('write.alerts.body'));
    return;
  }

  if (title.length > TITLE_MAX_LENGTH) {
    WarningSwal(
      t('write.alerts.bodyLengthLessThan', {
        titleMaxLength: TITLE_MAX_LENGTH,
      }),
    );
    return;
  }

  if (deadline && deadline < new Date()) {
    WarningSwal(t('write.alerts.deadline'));
    return;
  }

  switch (noticeLanguage) {
    case 'ko':
      if (!koreanBody) {
        WarningSwal(t('write.alerts.body'));
        return;
      }
      break;
    case 'en':
      if (!englishBody) {
        WarningSwal(t('write.alerts.body'));
        return;
      }
      break;
    case 'both':
      if (!koreanBody && !englishBody) {
        WarningSwal(t('write.alerts.body'));
        return;
      }
      if (!koreanBody && englishBody) {
        WarningSwal(t('write.alerts.englishBody'));
        return;
      }
      if (koreanBody && !englishBody) {
        WarningSwal(t('write.alerts.koreanBody'));
        return;
      }
      break;
  }

  switch (noticeLanguage) {
    case 'ko':
      if (koreanBody && koreanBody.length > BODY_MAX_LENGTH) {
        WarningSwal(
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
        WarningSwal(
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
        WarningSwal(
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
        WarningSwal(`한국어 본문은 ${BODY_MAX_LENGTH}자 이내로 입력해주세요`);
        return;
      } else if (englishBody && englishBody.length > BODY_MAX_LENGTH) {
        WarningSwal(`영어 본문은 ${BODY_MAX_LENGTH}자 이내로 입력해주세요`);
        return;
      }
      break;
  }

  const tagIds: number[] | undefined = await handleTagSubmit(tags);
  if (!tagIds) return;

  // need to remove log later
  console.log(
    title,
    deadline,
    noticeLanguage,
    koreanBody,
    englishBody,
    tagIds,
    images,
  );

  Swal.fire({
    text: '공지를 작성 중입니다',
    icon: 'info',
    showConfirmButton: false,
  });

  const notice = await apolloClient.mutate({
    mutation: CREATE_NOTICE,
    variables: {
      title,
      deadline,
      body: koreanBody!,
    },
  });

  const id = notice.data?.createNotice.id;
  if (!id) {
    Swal.fire({
      text: '공지를 작성하는데 실패했습니다',
      icon: 'error',
      confirmButtonText: '확인',
    });
    return;
  }

  return id;
};

const handleTagSubmit = async (tags: string[]) => {
  const tagIds: number[] = [];

  for (const tagName of tags) {
    const searchedTag = await getOneTag(tagName);

    if (!searchedTag) {
      const createdTag = await createTag(tagName);

      if (!createdTag) {
        Swal.fire({
          text: '태그를 생성하는데 실패했습니다',
          icon: 'error',
          confirmButtonText: '확인',
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
