import { Editor } from '@tinymce/tinymce-react';
import { ForwardedRef, forwardRef } from 'react';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

const TinyMCEEditor = ({
  editorRef,
}: {
  editorRef: ForwardedRef<TinyMCEEditorRef>;
}) => (
  <Editor
    onInit={(_, editor) => {
      if (!editorRef) return;
      if (typeof editorRef === 'function') editorRef(editor);
      else editorRef.current = editor;
    }}
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
    }}
    onBlur={(event) =>
      sendLog(LogEvents.noticeWritingPageTypeContent, {
        content: event.target.getContent(),
      })
    }
  />
);

export default TinyMCEEditor;
