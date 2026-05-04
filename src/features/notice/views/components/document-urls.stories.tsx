import { DocumentUrls } from './document-urls';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Notice/DocumentUrls',
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
    documentUrls: [
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목1.pdf',
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목2.pdf',
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목3.pdf',
    ],
  },
};

export const SourceUrlOnly: Story = {
  args: {
    crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    documentUrls: [],
  },
};

export const Both: Story = {
  args: {
    crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    documentUrls: [
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목1.pdf',
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목2.pdf',
      'https://www.gist.ac.kr/kr/attachments/첨부파일_제목3.pdf',
    ],
  },
};

export const Empty: Story = {
  args: {
    documentUrls: [],
  },
};
