'use client';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { Editor } from '@tinymce/tinymce-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import Chip from '@/app/components/molecules/Chip';
import { createTranslation } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import ContentIcon from '@/assets/icons/content.svg';
import LanguageIcon from '@/assets/icons/language.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TypeIcon from '@/assets/icons/type.svg';

import DeepLButton from './DeepLButton';
import TagInput, { Tag } from './TagInput';
type NoticeType = 'recruit' | 'event' | 'general';
const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

// for react-datetime-picker
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function WritePage({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = useTranslation(lng, 'translation');

  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, onDeadlineChange] = useState<Value>(new Date());
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>('recruit');

  const [tags, setTags] = useState<Tag[]>([]);

  const [isWriteKorean, setIsWriteKorean] = useState(true);
  const [isWriteEnglish, setIsWriteEnglish] = useState(false);

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

  // need to hide the key
  const TINYMCE_API_KEY = '11hgm7c99hquhlmkl38lvqzg7a0n7srlvicwsvk14swrcsei';
  const editorRef = useRef<any>(null);

  return (
    <main className="flex flex-col items-center md:py-12">
      <div className="flex flex-col content">
        <input
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
            <DateTimePicker onChange={onDeadlineChange} value={deadline} />
          )}
        </div>

        <div className="flex gap-2 mb-3">
          <TypeIcon className="w-5 md:w-6" />
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

        <div className="flex gap-2 mt-10 mb-3">
          <TagIcon className="w-5 md:w-6" />
          <div className="font-medium text-lg">{t('write.setupTags')}</div>
        </div>

        <TagInput tags={tags} setTags={setTags} t={t} />

        <div className="flex gap-2 mt-10 mb-3 items-center">
          <LanguageIcon className="w-5 md:w-6" />
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

        {isWriteKorean && (
          <div>
            <div className="flex gap-2 mt-10 mb-3 items-center">
              <ContentIcon className="w-5 md:w-6" />
              <div className="font-medium text-lg">
                {t('write.enterKoreanContent')}
              </div>
            </div>

            <Editor
              onInit={(_, editor) => (editorRef.current = editor)}
              // tinymceScriptSrc="/tinymce/tinymce.min.js"
              // apiKey={TINYMCE_API_KEY}
              init={{
                promotion: false,
                plugins: ['link', 'image', 'code'],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | link',
              }}
              onBlur={(event) =>
                sendLog(LogEvents.noticeWritingPageTypeContent, {
                  content: event.target.getContent(),
                })
              }
            />
          </div>
        )}

        {isWriteEnglish && (
          <div className="flex gap-2 mt-10 mb-3 items-center">
            <ContentIcon className="w-5 md:w-6" />
            <div className="font-medium text-lg mr-4">
              {t('write.enterEnglishContent')}
            </div>
            <DeepLButton t={t} />
          </div>
        )}
      </div>
    </main>
  );
}
