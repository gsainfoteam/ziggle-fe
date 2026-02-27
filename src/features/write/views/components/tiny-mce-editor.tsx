import type React from 'react';

import { Editor } from '@tinymce/tinymce-react';

// Ensure to import tinymce first as other components expect
// a global variable `tinymce` to exist
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';
import 'tinymce/skins/ui/oxide-dark/skin';
// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/content/dark/content';
import 'tinymce/skins/ui/oxide/content';
import 'tinymce/skins/ui/oxide-dark/content';

// Import plugins
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import { useTheme } from '@/common/lib/theme';

export const TinyMCEEditor = ({
  ...props
}: React.ComponentProps<typeof Editor>) => {
  const { theme } = useTheme();
  return (
    <Editor
      licenseKey="gpl"
      init={{
        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: theme === 'dark' ? 'dark' : 'default',
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
  );
};
