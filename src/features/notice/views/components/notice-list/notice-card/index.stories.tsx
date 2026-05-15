import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import type { Notice } from '@/features/notice/models';

import { NoticeCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const baseNotice: Notice = {
  id: 1,
  title: '모의 공지 제목입니다',
  content: '모의 공지 본문입니다. 여러 줄로 구성된 내용을 보여줍니다.',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  author: { uuid: 'author-1', name: '홍길동', picture: null },
  deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: ['https://placehold.co/400x200?text=Image'],
  tags: ['태그1', '태그2'],
  views: 42,
  langs: ['ko'],
  reactions: [{ emoji: '🔥', count: 5, isReacted: false }],
  isReminded: false,
  category: {},
  publishedAt: new Date().toISOString(),
  documents: [],
  isViewed: false,
  isBookmarked: false,
};

const renderCard = (notice: Notice, searchQuery?: string) => (
  <NoticeCard.Root id={notice.id}>
    <NoticeCard.Header
      author={notice.author}
      createdAt={notice.createdAt}
      deadline={notice.deadline}
      query={searchQuery}
    />
    <NoticeCard.Body>
      <div className="flex items-baseline gap-2">
        <NoticeCard.Title query={searchQuery}>{notice.title}</NoticeCard.Title>
        <div className="shrink-0">
          <NoticeCard.AttachmentIndicators
            documents={notice.documents}
            crawledUrl={notice.crawledUrl}
          />
        </div>
      </div>
      <NoticeCard.ImageCarousel
        imageUrls={notice.imageUrls}
        title={notice.title}
      />
      <NoticeCard.Tags tags={notice.tags} />
      <NoticeCard.Content query={searchQuery}>
        {notice.content}
      </NoticeCard.Content>
    </NoticeCard.Body>
    <div className="mx-3 my-2.5">
      <NoticeCard.Actions {...notice} />
    </div>
  </NoticeCard.Root>
);

const queryClient = new QueryClient();

interface ComposedArgs {
  notice: Notice;
  searchQuery?: string;
}

const ComposedNoticeCard = ({ notice, searchQuery }: ComposedArgs) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-160">{renderCard(notice, searchQuery)}</div>
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
  title: 'Notice/NoticeCard',
  component: ComposedNoticeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComposedNoticeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { notice: baseNotice },
};

export const WithoutDeadline: Story = {
  args: { notice: { ...baseNotice, deadline: undefined } },
};

export const MultipleImages: Story = {
  args: {
    notice: {
      ...baseNotice,
      imageUrls: [
        'https://placehold.co/400x200?text=Image+1',
        'https://placehold.co/400x200?text=Image+2',
        'https://placehold.co/400x200?text=Image+3',
      ],
    },
  },
};

export const WithoutImage: Story = {
  args: { notice: { ...baseNotice, imageUrls: [] } },
};

export const WithoutTags: Story = {
  args: { notice: { ...baseNotice, tags: [] } },
};

export const WithPicture: Story = {
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

export const WithDocuments: Story = {
  args: {
    notice: {
      ...baseNotice,
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

export const WithSearchHighlight: Story = {
  args: {
    notice: baseNotice,
    searchQuery: '공지',
  },
};
