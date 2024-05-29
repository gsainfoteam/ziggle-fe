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
  onChangeTitle: (title: string) => void;
  onChangeContent: (event: TinyMCEEditorChangeEvent) => void;
  titleLabel: string;
  contentLabel: string;
  disabled?: boolean;
}

const TitleAndContent = ({
  editorRef,
  title,
  titleLabel,
  contentLabel,
  onChangeTitle,
  onChangeContent,
  t,
  disabled,
}: PropsWithT<TitleAndContentProps>) => {
  return (
    <>
      <div className="mb-[10px] mt-10 flex gap-[6px]">
        <TextIcon className="w-5 stroke-text md:w-6" />
        <p className="font-medium">{titleLabel}</p>
      </div>

      <input
        disabled={disabled}
        value={title}
        onChange={(e) => {
          onChangeTitle(e.target.value);
        }}
        type="text"
        placeholder={t('write.writeTitle')}
        onBlur={(e) => {
          sendLog(LogEvents.noticeWritingPageTypeTitle, {
            title: e.target.value,
          });
        }}
        className={
          'flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-solid bg-transparent px-4 py-[10px] ' +
          (disabled
            ? 'border-grey text-greyDark dark:text-dark_greyDark'
            : 'border-primary text-text dark:text-dark_white')
        }
      />

      <div className="mb-3 mt-10 flex items-center gap-2">
        <ContentIcon className="w-5 stroke-text md:w-6" />
        <p className="font-medium">{contentLabel}</p>
      </div>

      <React.Suspense>
        <DynamicTinyMCEEditor
          disabled={disabled}
          editorRef={editorRef}
          onChange={onChangeContent}
        />
      </React.Suspense>
    </>
  );
};

export default TitleAndContent;
