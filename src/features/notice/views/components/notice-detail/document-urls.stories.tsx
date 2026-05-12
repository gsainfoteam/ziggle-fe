import { NoticeDetailDocumentUrls as DocumentUrls } from './document-urls';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/DocumentUrls',
  component: DocumentUrls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentUrls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AttachmentsOnly: Story = {
  args: {
    documents: [
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document1.pdf',
        name: '첨부파일_제목1.pdf',
      },
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document2.pdf',
        name: '첨부파일_제목2.pdf',
      },
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document3.pdf',
        name: '첨부파일_제목3.pdf',
      },
    ],
  },
};

export const SourceUrlOnly: Story = {
  args: {
    crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    documents: [],
  },
};

export const Both: Story = {
  args: {
    crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    documents: [
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document1.pdf',
        name: '첨부파일_제목1.pdf',
      },
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document2.pdf',
        name: '첨부파일_제목2.pdf',
      },
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document3.pdf',
        name: '첨부파일_제목3.pdf',
      },
    ],
  },
};

export const LongFileName: Story = {
  args: {
    crawledUrl:
      'https://www.gist.ac.kr/kr/html/sub05/very_long_path_without_any_spaces_to_force_break_all_behavior_test.html',
    documents: [
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document1.pdf',
        name: 'extremely_long_attachment_filename_without_any_spaces_or_breakpoints_to_verify_break_all_layout_handling.pdf',
      },
      {
        url: 'https://www.gist.ac.kr/kr/attachments/document2.pdf',
        name: '띄어쓰기없는한글로된아주아주아주아주긴첨부파일제목으로레이아웃넘침을확인하는테스트케이스.pdf',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    documents: [],
  },
};
