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

import { NoticeDetail } from '.';

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

interface ComposedArgs {
  notice: NoticeDetailModel;
  isOwner?: boolean;
}

const ComposedNoticeDetail = ({ notice, isOwner }: ComposedArgs) => {
  const rootRoute = createRootRoute({
    component: () => (
      <NoticeDetail.Root>
        <div className="hidden md:block">
          <NoticeDetail.ImageStack
            sources={notice.imageUrls}
            alt={notice.title}
          />
        </div>

        <NoticeDetail.Body>
          <NoticeDetail.Deadline deadline={notice.currentDeadline} />
          <NoticeDetail.Metadata
            author={notice.author}
            createdAt={notice.createdAt}
          />
          {isOwner && <NoticeDetail.AuthorActions noticeId={notice.id} />}
          <NoticeDetail.Title>{notice.title}</NoticeDetail.Title>
          <NoticeDetail.Tags tags={notice.tags} />
          <NoticeDetail.DocumentUrls
            crawledUrl={notice.crawledUrl}
            documents={notice.documents}
          />
          <div className="md:hidden">
            <NoticeDetail.ImageStack
              width={900}
              sources={notice.imageUrls}
              alt={notice.title}
            />
          </div>
          <NoticeDetail.Content content={notice.content} />
          <NoticeDetail.Actions
            id={notice.id}
            title={notice.title}
            reactions={notice.reactions}
          />
          <NoticeDetail.AdditionalNotices
            additionalContents={notice.additionalContents}
            originalDeadline={notice.deadline}
          />
        </NoticeDetail.Body>
      </NoticeDetail.Root>
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
  component: ComposedNoticeDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComposedNoticeDetail>;

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
    },
  },
};

export const WithCrawledUrl: Story = {
  args: {
    notice: {
      ...baseNotice,
      crawledUrl: 'https://www.gist.ac.kr/kr/html/sub05/050502.html',
    },
  },
};

export const WithAdditionalNotices: Story = {
  args: {
    notice: {
      ...baseNotice,
      additionalContents: [
        {
          id: 1,
          lang: 'ko',
          content:
            '장소가 변경되었습니다. 기존 학생회관 3층 → 도서관 세미나실로 변경됩니다.',
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: 2,
          lang: 'ko',
          content: '모집 인원이 10명에서 15명으로 증가했습니다.',
          deadline: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          createdAt: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
    },
  },
};
