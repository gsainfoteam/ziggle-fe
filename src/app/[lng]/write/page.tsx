'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Button from '@/app/components/atoms/Button';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import Chip from '@/app/components/molecules/Chip';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import AddPhotoIcon from '@/assets/icons/add-photo.svg';
import ContentIcon from '@/assets/icons/content.svg';
import LanguageIcon from '@/assets/icons/language.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TypeIcon from '@/assets/icons/type.svg';

import AttatchPhotoArea from './AttatchPhotoArea';
import DeepLButton from './DeepLButton';
import handleNoticeSubmit from './HandleNoticeSubmit';
import TagInput, { Tag } from './TagInput';

type NoticeType = 'recruit' | 'event' | 'general';
const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

const DynamicTinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
});

export default function WritePage({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = useTranslation(lng, 'translation');
  const { push } = useRouter();

  const [title, setTitle] = useState('');

  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>('recruit');

  const [tags, setTags] = useState<Tag[]>([]);

  const [isWriteKorean, setIsWriteKorean] = useState(true);
  const [isWriteEnglish, setIsWriteEnglish] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const koreanEditorRef = useRef<any>(null);
  const englishEditorRef = useRef<any>(null);

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
    const koreanBody = koreanEditorRef.current
      ? koreanEditorRef.current.getContent()
      : undefined;
    const englishBody = englishEditorRef.current
      ? englishEditorRef.current.getContent()
      : undefined;

    const noticeId = await handleNoticeSubmit({
      title,
      deadline: hasDeadline ? deadline ?? undefined : undefined,
      noticeLanguage: isWriteKorean ? (isWriteEnglish ? 'both' : 'ko') : 'en',
      koreanBody,
      englishBody,
      tags: tags.map((tag) => tag.name),
      images,
      t,
    });
    if (!noticeId) return;
    push(`/${lng}/notice/${noticeId}`);
  };

  return (
    <main className="flex flex-col items-center md:py-12">
      <div className="flex flex-col content">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="text-4xl font-bold mt-16 mb-4 p-0 content outline-none dark:bg-transparent w-full"
          type="text"
          placeholder={t('write.writeTitle')}
          onBlur={(e) => {
            sendLog(LogEvents.noticeWritingPageTypeTitle, {
              title: e.target.value,
            });
          }}
        />
        <div className="flex items-center gap-5 mb-10 flex-wrap md:flex-nowrap">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => {
              setHasDeadline(e.target.checked);

              sendLog(LogEvents.noticeWritingPageCheckDeadline, {
                hasDeadline: e.target.checked,
              });
            }}
          >
            <div className="font-medium text-lg">
              {t('write.setupDeadline')}
            </div>
          </Checkbox>

          {hasDeadline && (
            <DateTimePicker
              onChange={setDeadline}
              value={deadline}
              className="text-black bg-white"
            />
          )}
        </div>

        <div className="flex gap-2 mb-3">
          <TypeIcon className="w-5 md:w-6 dark:fill-white" />
          <div className="font-medium text-lg">{t('write.noticeType')}</div>
        </div>

        <div className="flex gap-1 mb-4">
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
            <div className="font-bold text-base md:text-xl">
              {t(`write.noticeTypes.${noticeType}.description.title`)}
            </div>
            <div className="font-regular text-sm md:text-lg">
              {t(`write.noticeTypes.${noticeType}.description.content`)}
            </div>
            <div className="font-regular text-sm md:text-lg text-secondayText">
              {t(`write.noticeTypes.${noticeType}.description.example`)}
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-10 mb-2">
          <TagIcon className="w-5 md:w-6 dark:fill-white" />
          <div className="font-medium text-lg">{t('write.setupTags')}</div>
        </div>

        <div className="font-regular text-sm text-secondayText mb-3">
          {t('write.writeTagsDescription')}
        </div>

        <TagInput tags={tags} setTags={setTags} t={t} />

        <div className="flex gap-2 mt-10 mb-3 items-center">
          <LanguageIcon className="w-5 md:w-6 dark:fill-white" />
          <div className="font-medium text-lg">{t('write.setupLanguage')}</div>
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
          <div className="flex gap-2 mt-10 mb-3 items-center">
            <ContentIcon className="w-5 md:w-6 dark:fill-white" />
            <div className="font-medium text-lg">
              {t('write.enterKoreanContent')}
            </div>
          </div>

          <React.Suspense>
            <DynamicTinyMCEEditor ref={koreanEditorRef} />
          </React.Suspense>
        </div>

        <div className={`${isWriteEnglish ? '' : 'hidden'}`}>
          <div className="flex gap-2 mt-10 mb-3 items-center">
            <ContentIcon className="w-5 md:w-6 dark:fill-white" />
            <div className="font-medium text-lg mr-4">
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
            <DynamicTinyMCEEditor ref={englishEditorRef} />
          </React.Suspense>
        </div>

        <div className="flex gap-2 mt-10 mb-1 items-center">
          <AddPhotoIcon className="w-5 md:w-6 dark:fill-white" />
          <div className="font-medium text-lg">{t('write.attatchPhoto')}</div>
        </div>
        <div className="font-regular text-secondayText text-sm mb-3">
          {t('write.photoDescription')}
        </div>

        <AttatchPhotoArea t={t} files={images} setFiles={setImages} />
      </div>

      <Button
        variant="contained"
        className="mt-[10rem] mb-4"
        onClick={handleSubmit}
      >
        <div className="font-bold text-base md:text-xl mx-3 my-1">
          {t('write.submit')}
        </div>
      </Button>
      <div className="font-regular text-sm text-secondayText max-w-[70%] text-center">
        {t('write.submitDescription')}
      </div>
    </main>
  );
}
