import { Editor } from '@tinymce/tinymce-react';
import { ForwardedRef } from 'react';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

export interface TinyMCEEditorChangeEvent {
  readonly type: string;
  readonly target: any;
  readonly isDefaultPrevented: () => boolean;
  readonly preventDefault: () => void;
  readonly isPropagationStopped: () => boolean;
  readonly stopPropagation: () => void;
  readonly isImmediatePropagationStopped: () => boolean;
  readonly stopImmediatePropagation: () => void;
}

const TinyMCEEditor = ({
  editorRef,
  onChange,
  disabled,
}: {
  editorRef: ForwardedRef<TinyMCEEditorRef>;
  onChange?: (event: TinyMCEEditorChangeEvent) => void;
  disabled?: boolean;
}) => (
  <Editor
    disabled={disabled}
    onInit={(_, editor) => {
      if (!editorRef) return;
      if (typeof editorRef === 'function') editorRef(editor);
      else editorRef.current = editor;
    }}
    onChange={onChange}
    tinymceScriptSrc="/tinymce/tinymce.min.js"
    init={{
      skin: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'oxide-dark'
        : 'oxide',
      content_css: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'default',
      promotion: false,
      plugins: ['link', 'image', 'code', 'autolink'],
      linkchecker_service_url: '/linkchecker',
      toolbar:
        'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | link',
      link_target_list: [
        { title: 'New page', value: '_blank', selected: true },
      ],
    }}
    onBlur={(event) =>
      sendLog(LogEvents.noticeWritingPageTypeContent, {
        content: event.target.getContent(),
      })
    }
  />
);

export default TinyMCEEditor;
