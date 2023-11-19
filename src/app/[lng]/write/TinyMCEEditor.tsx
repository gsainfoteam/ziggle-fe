import { Editor } from '@tinymce/tinymce-react';
import { forwardRef } from 'react';
import { Editor as TinyMCEEditorRef } from 'tinymce';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';

const TinyMCEEditor = forwardRef<TinyMCEEditorRef, {}>((_, ref) => (
  <Editor
    onInit={(_, editor) => {
      if (ref && typeof ref === 'object') {
        ref.current = editor;
      }
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
));
TinyMCEEditor.displayName = 'TinyMCEEditor';

export default TinyMCEEditor;
