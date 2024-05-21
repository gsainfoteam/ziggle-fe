'use client';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import dynamic from 'next/dynamic';
import React from 'react';
import { Editor } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { PropsWithT } from '@/app/i18next';
import ContentIcon from '@/assets/icons/content.svg';
import TextIcon from '@/assets/icons/text.svg';
import { NOTICE_LOCAL_STORAGE_KEY } from '@/utils/constants';

import { TinyMCEEditorChangeEvent } from './TinyMCEEditor';

const DynamicTinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
});

interface TitleAndContentProps {
  editorRef: React.MutableRefObject<Editor | null>;
  title: string;
  setTitle: (title: string) => void;
  language: 'korean' | 'english';
}

const TitleAndContent = ({
  editorRef,
  title,
  setTitle,
  t,
  language,
}: PropsWithT<TitleAndContentProps>) => {
  const handleEditorChange = (event: TinyMCEEditorChangeEvent) => {
    // Even though the event is "onChange", it is actually "onBlur"
    const { koreanTitle, englishTitle, koreanBody, englishBody } = JSON.parse(
      localStorage.getItem(NOTICE_LOCAL_STORAGE_KEY) || '{}',
    );

    localStorage.setItem(
      NOTICE_LOCAL_STORAGE_KEY,
      JSON.stringify(
        language === 'korean'
          ? {
              koreanTitle: title,
              englishTitle,
              koreanBody: event.target.getContent(),
              englishBody: englishBody,
            }
          : {
              koreanTitle,
              englishTitle: title,
              koreanBody: koreanBody,
              englishBody: event.target.getContent(),
            },
      ),
    );
  };

  return (
    <>
      <div className="mb-[10px] mt-10 flex gap-[6px]">
        <TextIcon className="w-5 stroke-text dark:fill-white md:w-6" />
        <p className="font-medium">
          {language === 'korean'
            ? t('write.koreanTitle')
            : t('write.englishTitle')}
        </p>
      </div>

      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        placeholder={t('write.writeTitle')}
        onBlur={(e) => {
          sendLog(LogEvents.noticeWritingPageTypeTitle, {
            title: e.target.value,
          });
        }}
        className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-solid border-primary px-4 py-[10px]"
      />

      <div className="mb-3 mt-10 flex items-center gap-2">
        <ContentIcon className="w-5 dark:fill-white md:w-6" />
        <p className="font-medium">
          {language === 'korean'
            ? t('write.koreanContent')
            : t('write.englishContent')}
        </p>
      </div>

      <React.Suspense>
        <DynamicTinyMCEEditor
          editorRef={editorRef}
          onChange={handleEditorChange}
        />
      </React.Suspense>
    </>
  );
};

export default TitleAndContent;
