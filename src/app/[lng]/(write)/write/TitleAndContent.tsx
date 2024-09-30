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

import { BODY_MAX_LENGTH, TITLE_MAX_LENGTH } from './handle-notice-submit';
import TinyMCEEditorSkeleton from './TinyMCEEditorSkeleton';

const DynamicTinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), {
  ssr: false,
  loading: TinyMCEEditorSkeleton,
});

interface TitleAndContentProps {
  title: string;
  titleLabel: string;
  onChangeTitle: (newTitle: string) => void;
  content: string;
  contentLabel: string;
  onChangeContent: (newContent: string) => void;
  editorRef: React.MutableRefObject<Editor | null>;
  disabled?: boolean;
}

const TitleAndContent = ({
  title,
  titleLabel,
  onChangeTitle,
  content,
  contentLabel,
  onChangeContent,
  editorRef,
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
          'flex items-center gap-1.5 overflow-x-hidden rounded-[10px] border-[1.5px] border-solid bg-transparent px-4 py-[10px] ' +
          (disabled
            ? 'border-grey text-greyDark dark:text-dark_greyDark'
            : 'border-primary text-text dark:text-dark_white')
        }
      />
      {title.length > TITLE_MAX_LENGTH && (
        <div className="font-regular my-1 text-sm text-secondaryText md:text-base">
          {'⚠️ '}
          {t('write.alerts.titleLengthLessThan', {
            titleMaxLength: TITLE_MAX_LENGTH,
          })}
        </div>
      )}

      <div className="mb-3 mt-10 flex items-center gap-2">
        <ContentIcon className="w-5 stroke-text md:w-6" />
        <p className="font-medium">{contentLabel}</p>
      </div>

      <DynamicTinyMCEEditor
        disabled={disabled}
        value={content}
        onChange={onChangeContent}
        editorRef={editorRef}
      />

      {content.length > BODY_MAX_LENGTH && (
        <div className="font-regular my-1 text-sm text-secondaryText md:text-base">
          {'⚠️ '}
          {t('write.alerts.bodyLengthLessThan', {
            bodyMaxLength: BODY_MAX_LENGTH,
          }) +
            ' ' +
            t('write.alerts.numberOfCharacter', {
              length: content.length,
              maxLength: BODY_MAX_LENGTH,
            })}
        </div>
      )}
    </>
  );
};

export default TitleAndContent;
