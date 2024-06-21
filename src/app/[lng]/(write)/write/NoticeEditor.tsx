'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Editor } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import {
  attachInternationalNotice,
  createAdditionalNotice,
  NoticeDetail,
} from '@/api/notice/notice';
import AddAdditionalNotice from '@/app/[lng]/(common)/(needSidebar)/notice/[id]/AddAdditionalNotice';
import handleNoticeEdit from '@/app/[lng]/(write)/write/handle-notice-edit';
import Button from '@/app/components/atoms/Button';
import Toggle from '@/app/components/atoms/Toggle/Toggle';
import DateTimePicker from '@/app/components/organisms/DateTimePicker';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import GlobeIcon from '@/assets/icons/globe.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TypeIcon from '@/assets/icons/type.svg';
import { NOTICE_LOCAL_STORAGE_KEY } from '@/utils/constants';
import { WarningSwal } from '@/utils/swals';
import { calculateRemainingTime } from '@/utils/utils';

import AttachPhotoArea, { FileWithUrl } from './AttachPhotoArea';
import DeepLButton from './DeepLButton';
import EditableTimer from './EditableTimer';
import handleNoticeSubmit from './handle-notice-submit';
import LanguageTab from './LanguageTab';
import NoticeTypeSelector, { NoticeType } from './NoticeTypeSelector';
import TagInput, { Tag } from './TagInput';
import TitleAndContent from './TitleAndContent';

interface NoticeEditorProps {
  params: PropsWithLng;
  notice?: NoticeDetail & {
    enTitle?: string;
    enContent?: string;
  };
  isEditMode: boolean;
}

const NoticeEditor = ({
  params: { lng },
  notice,
  isEditMode,
}: NoticeEditorProps) => {
  const { t } = useTranslation(lng);
  const { push } = useRouter();
  const isEditable = (() => {
    const remain = calculateRemainingTime(dayjs(notice?.createdAt));
    return remain.minutes > 0 && remain.seconds > 0;
  })();

  const [koreanTitle, setKoreanTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');

  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState<Dayjs>(dayjs());
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>('recruit');

  const [tags, setTags] = useState<Tag[]>([]);

  const [hasEnglishContent, setHasEnglishContent] = useState(false);
  const [writingTab, setWritingTab] = useState<'korean' | 'english'>('korean');

  const [photos, setPhotos] = useState<FileWithUrl[]>([]);

  const koreanEditorRef = useRef<Editor>(null);
  const englishEditorRef = useRef<Editor>(null);

  const additionalKoreanRef = useRef<HTMLTextAreaElement>(null);
  const additionalEnglishRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (localStorage.getItem(NOTICE_LOCAL_STORAGE_KEY)) {
        const { koreanTitle, englishTitle, koreanBody, englishBody } =
          JSON.parse(localStorage.getItem(NOTICE_LOCAL_STORAGE_KEY) ?? '{}');

        if (!koreanTitle && !englishTitle && !koreanBody && !englishBody)
          return;

        const confirm = await Swal.fire({
          text: t('write.hasSavedNotice'),
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: t('alertResponse.yes'),
          cancelButtonText: t('alertResponse.no'),
        });

        if (!confirm.isConfirmed) return;

        setKoreanTitle(koreanTitle);
        setEnglishTitle(englishTitle);
        if (englishTitle) {
          setHasEnglishContent(true);
        }

        if (koreanEditorRef.current) {
          koreanEditorRef.current.setContent(koreanBody);
        }

        if (englishEditorRef.current) {
          englishEditorRef.current.setContent(englishBody);
        }
      }
    };

    const fetchExistingNotice = async () => {
      console.log(notice);

      if (!notice) return;

      setKoreanTitle(notice.title);
      if (notice.enTitle) {
        setHasEnglishContent(true);
        setEnglishTitle(notice.enTitle);
      }

      console.log(koreanEditorRef.current);

      function trySetKrContent() {
        // 원래는 koreanEditorRef.current 에 바로 setContent를 하려 했지만, tinyMCE의 로딩이 굉장히 느려서 notice가 도착하는 시점에는 null입니다.
        // 그래서 tinyMCE onInit에서 content를 설정하려 했는데 작동하지 않았습니다.
        // 그래서 이렇게 임시로 했습니다.
        if (koreanEditorRef.current && notice?.content) {
          koreanEditorRef.current.setContent(notice.content);
        } else {
          setTimeout(trySetKrContent, 1000); // Retry after 1 second
        }
      }

      function trySetEnContent() {
        if (englishEditorRef.current && notice?.enContent) {
          englishEditorRef.current.setContent(notice.enContent);
        } else {
          setTimeout(trySetEnContent, 1000); // Retry after 1 second
        }
      }

      trySetKrContent();
      trySetEnContent();

      notice.deadline && setDeadline(dayjs(notice.deadline));
    };

    isEditMode ? fetchExistingNotice() : checkLocalStorage();
  }, [isEditMode, notice, t]);

  const handleChange = async () => {
    if (isLoading) return;
    localStorage.setItem(
      NOTICE_LOCAL_STORAGE_KEY,
      JSON.stringify({
        koreanTitle,
        englishTitle,
        koreanBody: koreanEditorRef.current?.getContent(),
        englishBody: englishEditorRef.current?.getContent(),
      }),
    );
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    const koreanBody = koreanEditorRef.current?.getContent();
    const englishBody = englishEditorRef.current?.getContent();

    setIsLoading(true);
    const noticeId = await handleNoticeSubmit({
      title: koreanTitle,
      deadline: hasDeadline ? deadline.toDate() ?? undefined : undefined,
      noticeLanguage: hasEnglishContent ? 'both' : 'ko',
      koreanBody,
      enTitle: englishTitle,
      englishBody,
      tags: [selectedNoticeType, ...tags.map((tag) => tag.name)],
      images: photos.map((image) => image.file),
      t,
    });
    if (!noticeId) {
      setIsLoading(false);
      return;
    }

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);
    push(`/${lng}/notice/${noticeId}`);
  };

  const handleModify = async () => {
    if (isLoading || !notice) return;
    const koreanBody = koreanEditorRef.current?.getContent();
    const englishBody = englishEditorRef.current?.getContent();
    const additionalKoreanBody = additionalKoreanRef.current?.value;
    const additionalEnglishBody = additionalEnglishRef.current?.value;
    const warningSwal = WarningSwal(t);

    if (!additionalKoreanBody && additionalEnglishBody) {
      warningSwal(t('write.alerts.needKoreanAdditionalNotice'));
      return;
    }

    setIsLoading(true);

    Swal.fire({
      text: t('write.alerts.submittingNotice'),
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    if (isEditable) {
      const editedLangs: ('ko' | 'en')[] = [];
      if (koreanBody !== notice.content) {
        editedLangs.push('ko');
      }
      if (notice.enContent && englishBody !== notice.enContent) {
        editedLangs.push('en');
      }
      if (editedLangs.length) {
        const updatedNoticeId = await handleNoticeEdit({
          noticeId: notice.id,
          koreanBody,
          englishBody,
          noticeLanguage: editedLangs.length === 1 ? editedLangs[0] : 'both',
          deadline: hasDeadline && deadline ? deadline.toDate() : undefined,
          t,
        });

        if (!updatedNoticeId) {
          Swal.fire({
            text: t('write.alerts.submitFail'),
            icon: 'error',
            confirmButtonText: t('alertResponse.confirm'),
          });
        }
      }
    }

    if (notice.enContent === undefined && englishBody) {
      const englishNotice = await attachInternationalNotice({
        lang: 'en',
        title: englishTitle,
        deadline: hasDeadline && deadline ? deadline.toDate() : undefined,
        body: englishBody,
        noticeId: notice.id,
        contentId: 1,
      }).catch(() => null);

      if (!englishNotice) {
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

    const additionalKoreanNotice = additionalKoreanBody
      ? await createAdditionalNotice({
          noticeId: notice.id,
          body: additionalKoreanBody,
          deadline: hasDeadline && deadline ? deadline.toDate() : undefined,
        }).catch(() => null)
      : undefined;

    if (additionalKoreanNotice === null) {
      Swal.fire({
        text: t('write.alerts.attachAdditionalNoticeFail'),
        icon: 'error',
        confirmButtonText: t('alertResponse.confirm'),
        showDenyButton: true,
        denyButtonText: t('write.alerts.copyAdditionalNotice'),
      }).then((result) => {
        if (result.isDenied) {
          navigator.clipboard.writeText(additionalKoreanBody!);
          toast.success(t('write.alerts.copySuccess'));
        }
      });
      return;
    }

    const contents = additionalKoreanNotice?.additionalContents;

    if (contents) {
      const contentId = contents[contents.length - 1].id;

      const additionalEnglishNotice =
        additionalKoreanNotice && additionalEnglishBody
          ? await attachInternationalNotice({
              title: '',
              body: additionalEnglishBody,
              lang: 'en',
              noticeId: notice.id,
              contentId,
              deadline: hasDeadline && deadline ? deadline.toDate() : undefined,
            }).catch(() => null)
          : undefined;

      if (additionalEnglishNotice === null) {
        Swal.fire({
          text: t('write.alerts.attachInternationalAdditionalNoticeFail'),
          icon: 'error',
          confirmButtonText: t('alertResponse.confirm'),
          showDenyButton: true,
          denyButtonText: t('write.alerts.copyInternationalAdditionalNotice'),
        }).then((result) => {
          if (result.isDenied) {
            navigator.clipboard.writeText(additionalEnglishBody!);
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

    localStorage.removeItem(NOTICE_LOCAL_STORAGE_KEY);
    push(`/${lng}/notice/${notice.id}`);
  };

  return (
    <>
      {isEditMode && (
        <>
          {notice?.createdAt && (
            <EditableTimer createdAt={notice.createdAt} lng={lng} />
          )}
          <p
            className={
              'mt-[10px] rounded-[15px] bg-greyLight px-5 py-[15px] text-lg text-greyDark'
            }
          >
            {t('write.editDescription')}
          </p>
        </>
      )}

      {!isEditMode && (
        <div className={'flex justify-end'}>
          <p className={'text-sm text-primary'}>
            {t('write.autoSaveDescription')}
          </p>
        </div>
      )}

      <div className={'mb-10 mt-10 flex items-center gap-2'}>
        <GlobeIcon
          className={
            'w-5 md:w-6 ' +
            (hasEnglishContent
              ? 'stroke-text dark:stroke-dark_white'
              : 'stroke-grey dark:stroke-dark_grey')
          }
        />
        <p
          className={
            'mr-1 text-lg font-medium ' +
            (hasEnglishContent
              ? 'text-text dark:text-dark_white'
              : 'text-grey dark:text-dark_grey')
          }
        >
          {t('write.writeEnglishNotice')}
        </p>
        <Toggle
          isSwitched={hasEnglishContent}
          onSwitch={(e) => {
            setHasEnglishContent(e.target.checked);
            sendLog(LogEvents.noticeWritingPageCheckEnglish, {
              hasEnglishContent: e.target.checked,
            });
          }}
        />
      </div>

      <div className="mb-3 flex gap-[6px]">
        <TypeIcon className="w-5 stroke-text md:w-6 dark:stroke-dark_white" />
        <p className="font-medium">{t('write.noticeType')}</p>
      </div>

      <NoticeTypeSelector
        selectedNoticeType={selectedNoticeType}
        setNoticeType={setSelectedNoticeType}
        t={t}
        disabled={isEditMode}
      />

      {hasEnglishContent && (
        <div className="mt-10">
          <LanguageTab
            writingTab={writingTab}
            setWritingTab={setWritingTab}
            t={t}
          />
        </div>
      )}

      <div
        className={
          'flex flex-col justify-stretch ' +
          (writingTab !== 'korean' ? 'hidden' : '')
        }
      >
        <TitleAndContent
          editorRef={koreanEditorRef}
          title={koreanTitle}
          onChangeTitle={setKoreanTitle}
          onChangeContent={handleChange}
          titleLabel={t('write.koreanTitle')}
          contentLabel={t('write.koreanContent')}
          t={t}
          disabled={isEditMode && !isEditable}
        />
      </div>

      <div
        className={
          'flex flex-col justify-stretch ' +
          (writingTab === 'korean' ? 'hidden' : '')
        }
      >
        <TitleAndContent
          editorRef={englishEditorRef}
          title={englishTitle}
          onChangeTitle={setEnglishTitle}
          onChangeContent={handleChange}
          titleLabel={t('write.englishTitle')}
          contentLabel={t('write.englishContent')}
          t={t}
          disabled={!!(isEditMode && !isEditable && notice?.title)}
        />
      </div>

      {hasEnglishContent && (
        <DeepLButton
          t={t}
          editorRef={
            writingTab === 'korean' ? koreanEditorRef : englishEditorRef
          }
          originalLanguage={writingTab === 'korean' ? 'korean' : 'english'}
        />
      )}

      {/* 수정 모드이면서 (한국어 탭 && 수정 불가능) 또는 (영어 탭 && 수정 불가능 && 영어 공지 있음) */}
      {isEditMode &&
        ((writingTab === 'korean' && !isEditable) ||
          (writingTab === 'english' && !isEditable && notice?.enTitle)) && (
          <p
            className={
              'my-10 rounded-[10px] bg-greyLight px-[20px] py-[15px] text-center text-lg text-greyDark'
            }
          >
            {t('write.editDisabled')}
          </p>
        )}

      {isEditMode && notice && (
        <>
          <div className="h-10" />
          <AddAdditionalNotice
            noticeId={notice.id}
            originallyHasDeadline={notice.deadline}
            supportedLanguage={hasEnglishContent ? ['ko', 'en'] : ['ko']}
            koreanRef={additionalKoreanRef}
            englishRef={additionalEnglishRef}
            lng={lng}
          />
        </>
      )}

      <div className={'mb-3 mt-10 flex items-center gap-2'}>
        <ClockIcon className={'w-5 stroke-text md:w-6'} />

        <p className="text-lg font-medium">
          {t(isEditMode ? 'write.changeDeadline' : 'write.setupDeadline')}
        </p>

        <Toggle
          isSwitched={hasDeadline}
          onSwitch={(e) => {
            setHasDeadline(e.target.checked);
            sendLog(LogEvents.noticeWritingPageCheckDeadline, {
              hasDeadline: e.target.checked,
            });
          }}
        />

        <div className={'w-1'} />

        {hasDeadline && (
          <DateTimePicker dateTime={deadline} setDateTime={setDeadline} />
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="mb-2 mt-10 flex gap-2">
            <TagIcon className="w-5 fill-text md:w-6" />
            <p className="font-medium md:text-lg">{t('write.setupTags')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>

          <p className="font-regular mb-3 text-sm text-secondaryText">
            {t('write.writeTagsDescription')}
          </p>

          <TagInput tags={tags} setTags={setTags} t={t} />

          <div className="mb-1 mt-10 flex items-center gap-2">
            <AddPhotoIcon className="w-5 stroke-text md:w-6" />
            <p className="font-medium md:text-lg">{t('write.attachPhoto')}</p>
            <p className={'text-grey'}>{`(${t('common.optional')})`}</p>
          </div>
          <p className="font-regular mb-3 text-sm text-secondaryText">
            {t('write.photoDescription')}
          </p>

          <AttachPhotoArea t={t} photos={photos} setPhotos={setPhotos} />
        </>
      )}

      <div className={'mt-[10rem] flex flex-col items-center'}>
        <Button
          variant="contained"
          className="mb-4 w-60 rounded-[10px] py-2"
          onClick={isEditMode ? handleModify : handleSubmit}
          disabled={isLoading}
        >
          <p className="mx-3 my-1 text-base font-bold">{t('write.submit')}</p>
        </Button>
        <p className="font-regular max-w-[70%] text-center text-sm text-secondaryText">
          {t('write.submitDescription')}
        </p>
      </div>
    </>
  );
};

export default NoticeEditor;
