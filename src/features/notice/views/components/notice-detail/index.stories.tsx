import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import {
  EmojiString,
  type NoticeDetail as NoticeDetailModel,
} from '@/features/notice/models';

import { NoticeDetailActionsProvider } from './actions';

import { NoticeDetail } from '.';

import type { NoticeDetailProps } from '.';
import type { Meta, StoryObj } from '@storybook/react-vite';

const baseNotice: NoticeDetailModel = {
  id: 1,
  title: '2026 봄 학기 동아리 모집 — 학생회관에서 만나요',
  content: `
    <h2>모집 안내</h2>
    <p>2026 봄 학기 신입 부원을 모집합니다. 많은 관심 부탁드립니다.</p>
    <ul>
      <li>모집 분야: 개발 / 디자인 / 기획</li>
      <li>지원 자격: 재학생 누구나</li>
      <li>제출 서류: 자기소개서</li>
    </ul>
    <p>문의: club@example.com</p>
  `,
  author: { uuid: 'author-1', name: '홍길동', picture: null },
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  currentDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [
    'https://placehold.co/400x500?text=Poster+1',
    'https://placehold.co/400x300?text=Poster+2',
  ],
  tags: ['모집', '동아리', '봄학기'],
  views: 256,
  langs: ['ko'],
  reactions: [
    { emoji: EmojiString.FIRE, count: 12, isReacted: false },
    { emoji: EmojiString.THINKING, count: 3, isReacted: true },
  ],
  isReminded: false,
  category: {},
  publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  documents: [],
  additionalContents: [],
  isViewed: false,
  isBookmarked: false,
};

const queryClient = new QueryClient();

const WrappedNoticeDetail = ({
  notice,
  isOwner = false,
  additionalContents = [],
}: NoticeDetailProps) => {
  const rootRoute = createRootRoute({
    component: () => (
      <NoticeDetailActionsProvider
        id={notice.id}
        title={notice.title}
        reactions={notice.reactions}
        isBookmarked={notice.isBookmarked}
      >
        <NoticeDetail
          notice={notice}
          isOwner={isOwner}
          additionalContents={additionalContents}
        />
      </NoticeDetailActionsProvider>
    ),
  });
  const router = createRouter({ routeTree: rootRoute });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Notice/NoticeDetail',
  component: WrappedNoticeDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WrappedNoticeDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { notice: baseNotice },
};

export const AsOwner: Story = {
  args: { notice: baseNotice, isOwner: true },
};

export const WithoutDeadline: Story = {
  args: {
    notice: { ...baseNotice, deadline: undefined, currentDeadline: undefined },
  },
};

export const WithoutImages: Story = {
  args: { notice: { ...baseNotice, imageUrls: [] } },
};

export const MultipleImages: Story = {
  args: {
    notice: {
      ...baseNotice,
      imageUrls: Array.from(
        { length: 5 },
        (_, i) =>
          `https://placehold.co/${300 + i * 40}x${400 + i * 20}?text=Image+${i + 1}`,
      ),
    },
  },
};

export const WithDocuments: Story = {
  args: {
    notice: {
      ...baseNotice,
      documents: [
        {
          url: 'https://www.gist.ac.kr/kr/attachments/document1.pdf',
          name: '모집_요강.pdf',
        },
        {
          url: 'https://www.gist.ac.kr/kr/attachments/document2.pdf',
          name: '지원서_양식.pdf',
        },
      ],
      crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    },
  },
};

export const WithAuthorPicture: Story = {
  args: {
    notice: {
      ...baseNotice,
      author: {
        ...baseNotice.author,
        picture: 'https://picsum.photos/seed/author1/36/36',
      },
    },
  },
};

export const WithAdditionalNotices: Story = {
  args: {
    notice: baseNotice,
    additionalContents: [
      {
        id: 1,
        lang: 'ko',
        content:
          '장소가 변경되었습니다. 기존 학생회관 3층 → 도서관 세미나실로 변경됩니다.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        lang: 'ko',
        content: '모집 인원이 10명에서 15명으로 증가했습니다.',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

export const AllActive: Story = {
  args: {
    notice: {
      ...baseNotice,
      reactions: [
        { emoji: EmojiString.FIRE, count: 15, isReacted: true },
        { emoji: EmojiString.THINKING, count: 8, isReacted: false },
      ],
      isBookmarked: true,
    },
    isOwner: true,
  },
};
