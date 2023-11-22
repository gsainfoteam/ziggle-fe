'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Editor } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import Chip from '@/app/components/molecules/Chip';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';
import ContentIcon from '@/assets/icons/content.svg';
import LanguageIcon from '@/assets/icons/language.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TypeIcon from '@/assets/icons/type.svg';

import AttatchPhotoArea, { FileWithUrl } from './AttatchPhotoArea';
import DeepLButton from './DeepLButton';
import handleNoticeSubmit from './handle-notice-submit';
import TagInput, { Tag } from './TagInput';

type NoticeType = 'recruit' | 'event' | 'general';
const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

const DynamicTinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
});

export default function WritePage({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  const { t } = useTranslation(lng);
  const { push } = useRouter();

  const [title, setTitle] = useState('');

  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>('recruit');

  const [tags, setTags] = useState<Tag[]>([]);

  const [isWriteKorean, setIsWriteKorean] = useState(true);
  const [isWriteEnglish, setIsWriteEnglish] = useState(false);

  const [photos, setPhotos] = useState<FileWithUrl[]>([]);

  const koreanEditorRef = useRef<Editor>(null);
  const englishEditorRef = useRef<Editor>(null);

  const handleKoreanLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isWriteEnglish) {
      setIsWriteKorean(e.target.checked);
    }
  };

  const handleEnglishLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isWriteKorean) {
      setIsWriteEnglish(e.target.checked);
    }
  };

  const handleSubmit = async () => {
    const koreanBody = koreanEditorRef.current?.getContent();
    const englishBody = englishEditorRef.current?.getContent();

    const noticeId = await handleNoticeSubmit({
      title,
      deadline: hasDeadline ? deadline ?? undefined : undefined,
      noticeLanguage: isWriteKorean ? (isWriteEnglish ? 'both' : 'ko') : 'en',
      koreanBody,
      englishBody,
      tags: tags.map((tag) => tag.name),
      images: photos.map((image) => image.file),
      t,
    });
    if (!noticeId) return;
    push(`/${lng}/notice/${noticeId}`);
  };

  return (
    <main className="flex flex-col items-center md:py-12">
      <div className="content flex flex-col">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="content mb-4 mt-16 w-full p-0 text-4xl font-bold leading-normal outline-none dark:bg-transparent"
          type="text"
          placeholder={t('write.writeTitle')}
          onBlur={(e) => {
            sendLog(LogEvents.noticeWritingPageTypeTitle, {
              title: e.target.value,
            });
          }}
        />
        <div className="mb-10 flex flex-wrap items-center gap-5 md:flex-nowrap">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => {
              setHasDeadline(e.target.checked);

              sendLog(LogEvents.noticeWritingPageCheckDeadline, {
                hasDeadline: e.target.checked,
              });
            }}
          >
            <div className="text-lg font-medium">
              {t('write.setupDeadline')}
            </div>
          </Checkbox>

          {hasDeadline && (
            <DateTimePicker
              onChange={setDeadline}
              value={deadline}
              className="bg-white text-black"
            />
          )}
        </div>

        <div className="mb-3 flex gap-2">
          <TypeIcon className="w-5 dark:fill-white md:w-6" />
          <div className="text-lg font-medium">{t('write.noticeType')}</div>
        </div>

        <div className="mb-4 flex gap-1">
          {noticeTypes.map((noticeType) => (
            <div
              className="cursor-pointer"
              key={noticeType}
              onClick={() => {
                setSelectedNoticeType(noticeType);
                sendLog(LogEvents.noticeWritingPageSetType, {
                  type: noticeType,
                });
              }}
            >
              <Chip
                variant={
                  selectedNoticeType === noticeType ? 'contained' : 'outlined'
                }
              >
                <div className="text-sm md:text-base">
                  {t(`write.noticeTypes.${noticeType}.label`)}
                </div>
              </Chip>
            </div>
          ))}
        </div>

        {noticeTypes.map((noticeType) => (
          <div
            key={noticeType}
            className={`${selectedNoticeType !== noticeType && 'hidden'}`}
          >
            <div className="text-base font-bold md:text-xl">
              {t(`write.noticeTypes.${noticeType}.description.title`)}
            </div>
            <div className="font-regular text-sm md:text-lg">
              {t(`write.noticeTypes.${noticeType}.description.content`)}
            </div>
            <div className="font-regular text-secondayText text-sm md:text-lg">
              {t(`write.noticeTypes.${noticeType}.description.example`)}
            </div>
          </div>
        ))}

        <div className="mb-2 mt-10 flex gap-2">
          <TagIcon className="w-5 dark:fill-white md:w-6" />
          <div className="text-lg font-medium">{t('write.setupTags')}</div>
        </div>

        <div className="font-regular text-secondayText mb-3 text-sm">
          {t('write.writeTagsDescription')}
        </div>

        <TagInput tags={tags} setTags={setTags} t={t} />

        <div className="mb-3 mt-10 flex items-center gap-2">
          <LanguageIcon className="w-5 dark:fill-white md:w-6" />
          <div className="text-lg font-medium">{t('write.setupLanguage')}</div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={isWriteKorean}
            onChange={handleKoreanLanguageChange}
          >
            {t('write.languages.korean')}
          </Checkbox>
          <Checkbox
            checked={isWriteEnglish}
            onChange={handleEnglishLanguageChange}
          >
            {t('write.languages.english')}
          </Checkbox>
        </div>

        <div className={`${isWriteKorean ? '' : 'hidden'}`}>
          <div className="mb-3 mt-10 flex items-center gap-2">
            <ContentIcon className="w-5 dark:fill-white md:w-6" />
            <div className="text-lg font-medium">
              {t('write.enterKoreanContent')}
            </div>
          </div>

          <React.Suspense>
            <DynamicTinyMCEEditor editorRef={koreanEditorRef} />
          </React.Suspense>
        </div>

        <div className={`${isWriteEnglish ? '' : 'hidden'}`}>
          <div className="mb-3 mt-10 flex items-center gap-2">
            <ContentIcon className="w-5 dark:fill-white md:w-6" />
            <div className="mr-4 text-lg font-medium">
              {t('write.enterEnglishContent')}
            </div>
            {isWriteKorean && (
              <DeepLButton
                t={t}
                query={koreanEditorRef.current?.getContent()}
              />
            )}
          </div>
          <React.Suspense>
            <DynamicTinyMCEEditor editorRef={englishEditorRef} />
          </React.Suspense>
        </div>

        <div className="mb-1 mt-10 flex items-center gap-2">
          <AddPhotoIcon className="w-5 dark:fill-white md:w-6" />
          <div className="text-lg font-medium">{t('write.attatchPhoto')}</div>
        </div>
        <div className="font-regular text-secondayText mb-3 text-sm">
          {t('write.photoDescription')}
        </div>

        <AttatchPhotoArea t={t} photos={photos} setPhotos={setPhotos} />
      </div>

      <Button
        variant="contained"
        className="mb-4 mt-[10rem]"
        onClick={handleSubmit}
      >
        <div className="mx-3 my-1 text-base font-bold md:text-xl">
          {t('write.submit')}
        </div>
      </Button>
      <div className="font-regular text-secondayText max-w-[70%] text-center text-sm">
        {t('write.submitDescription')}
      </div>
    </main>
  );
}
