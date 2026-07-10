import { NoticeDetailMetadata as Metadata } from './metadata';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Notice/NoticeDetail/Metadata',
  component: Metadata,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views: 256,
    documents: [],
  },
} satisfies Meta<typeof Metadata>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithDeadline: Story = {
  args: {
    currentDeadline: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  },
};

export const WithSourceAndAttachments: Story = {
  args: {
    currentDeadline: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString(),
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
