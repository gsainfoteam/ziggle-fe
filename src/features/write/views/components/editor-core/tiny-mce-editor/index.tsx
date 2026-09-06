import type React from 'react';
import { useEffect, useImperativeHandle, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { type Editor as EditorType } from 'tinymce';

import 'tinymce/tinymce';
import 'tinymce/models/dom/model';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin';
import 'tinymce/skins/ui/oxide/content';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';

import { cn } from '@/common/utils';

import './tiny-mce.css';

const THEME_VARS = [
  '--color-background',
  '--color-foreground',
  '--color-primary',
  '--color-on-primary',
  '--color-muted',
  '--color-border',
] as const;

function syncIframeTheme(editor: EditorType) {
  const doc = editor.getDoc();
  if (!doc) return;

  const source = getComputedStyle(document.documentElement);
  for (const name of THEME_VARS) {
    doc.documentElement.style.setProperty(
      name,
      source.getPropertyValue(name).trim(),
    );
  }
}

const CONTENT_STYLE = [
  'body {',
  '  background-color: var(--color-background);',
  '  color: var(--color-foreground);',
  "  font-family: 'Pretendard Variable', Pretendard, system-ui, sans-serif;",
  '  line-height: 1.5;',
  '  margin: 1rem;',
  '}',
  'a { color: var(--color-primary); }',
  '::selection {',
  '  background-color: color-mix(in srgb, var(--color-primary) 35%, transparent);',
  '  color: var(--color-foreground);',
  '}',
].join('\n');

export const TinyMCEEditor = ({
  ref,
  invalid,
  ...props
}: Omit<React.ComponentProps<typeof Editor>, 'onInit'> & {
  ref: React.Ref<EditorType>;
  invalid?: boolean;
}) => {
  const editorRef = useRef<EditorType | null>(null);
  useImperativeHandle(ref, () => editorRef.current!);

  useEffect(() => {
    const sync = () => {
      const editor = editorRef.current;
      if (editor) syncIframeTheme(editor);
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border',
        invalid ? 'border-red-500' : 'border-border',
      )}
    >
      <Editor
        licenseKey="gpl"
        onInit={(_, editor) => {
          editorRef.current = editor;
          syncIframeTheme(editor);
        }}
        init={{
          skin: 'oxide',
          content_css: false,
          content_style: CONTENT_STYLE,
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
          ...props.init,
        }}
        {...props}
      />
    </div>
  );
};
