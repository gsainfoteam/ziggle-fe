import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import type { Notice } from '@/features/notice/models';

import { NoticeCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

/** Stable picsum URLs with explicit aspect ratios for layout review. */
const images = {
  square: 'https://picsum.photos/seed/notice-1x1/400/400',
  landscape4x3: 'https://picsum.photos/seed/notice-4x3/400/300',
  landscape16x9: 'https://picsum.photos/seed/notice-16x9/480/270',
  landscape21x9: 'https://picsum.photos/seed/notice-21x9/560/240',
  portrait3x4: 'https://picsum.photos/seed/notice-3x4/300/400',
  portrait9x16: 'https://picsum.photos/seed/notice-9x16/270/480',
} as const;

const baseNotice: Notice = {
  id: 1,
  title: '모의 공지 제목입니다',
  content:
    '2025학년도 1학기 학생 자치회비 납부 안내입니다. 자치회비는 학생 복지 및 행사 운영에 사용되며, 납부 기간은 3월 10일부터 3월 28일까지입니다. 미납 시 각종 학생 서비스 이용이 제한될 수 있으니 기간 내 납부 바랍니다.',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  author: { uuid: 'author-1', name: '홍길동', picture: null },
  deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrls: [images.landscape4x3],
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

const queryClient = new QueryClient();

interface StoryArgs {
  notice: Notice;
  searchQuery?: string;
}

const NoticeCardGallery = ({
  items,
}: {
  items: { label: string; notice: Notice }[];
}) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="flex w-160 flex-col gap-8">
        {items.map(({ label, notice }) => (
          <div key={label} className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {label}
            </p>
            <NoticeCard notice={notice} />
          </div>
        ))}
      </div>
    ),
  });
  const router = createRouter({ routeTree: rootRoute });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const WrappedNoticeCard = ({ notice, searchQuery }: StoryArgs) => {
  const rootRoute = createRootRoute({
    component: () => (
      <div className="w-160">
        <NoticeCard notice={notice} searchQuery={searchQuery} />
      </div>
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
  component: WrappedNoticeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WrappedNoticeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { notice: baseNotice },
};

export const Read: Story = {
  args: { notice: { ...baseNotice, isViewed: true } },
};

export const AllActive: Story = {
  args: {
    notice: {
      ...baseNotice,
      reactions: [{ emoji: '🔥', count: 6, isReacted: true }],
      isBookmarked: true,
    },
  },
};

export const WithoutDeadline: Story = {
  args: { notice: { ...baseNotice, deadline: undefined } },
};

export const ImageAspectRatios: Story = {
  name: 'Image Aspect Ratios',
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <NoticeCardGallery
      items={[
        {
          label: '1:1 Square',
          notice: { ...baseNotice, id: 11, imageUrls: [images.square] },
        },
        {
          label: '4:3 Landscape',
          notice: {
            ...baseNotice,
            id: 12,
            imageUrls: [images.landscape4x3],
          },
        },
        {
          label: '16:9 Landscape',
          notice: {
            ...baseNotice,
            id: 13,
            imageUrls: [images.landscape16x9],
          },
        },
        {
          label: '21:9 Ultrawide',
          notice: {
            ...baseNotice,
            id: 14,
            imageUrls: [images.landscape21x9],
          },
        },
        {
          label: '3:4 Portrait',
          notice: {
            ...baseNotice,
            id: 15,
            imageUrls: [images.portrait3x4],
          },
        },
        {
          label: '9:16 Tall',
          notice: {
            ...baseNotice,
            id: 16,
            imageUrls: [images.portrait9x16],
          },
        },
        {
          label: 'Multiple (+9, mixed ratios)',
          notice: {
            ...baseNotice,
            id: 17,
            imageUrls: [
              images.landscape4x3,
              images.square,
              images.landscape16x9,
              images.portrait3x4,
              images.landscape21x9,
              images.portrait9x16,
              'https://picsum.photos/seed/notice-extra-1/360/240',
              'https://picsum.photos/seed/notice-extra-2/240/360',
              'https://picsum.photos/seed/notice-extra-3/400/400',
              'https://picsum.photos/seed/notice-extra-4/480/270',
            ],
          },
        },
        {
          label: 'No image',
          notice: { ...baseNotice, id: 18, imageUrls: [] },
        },
      ]}
    />
  ),
};

export const TwoImages: Story = {
  args: {
    notice: {
      ...baseNotice,
      imageUrls: [images.landscape4x3, images.square],
    },
  },
};

export const WithoutImage: Story = {
  args: { notice: { ...baseNotice, imageUrls: [] } },
};

export const ShortContent: Story = {
  args: { notice: { ...baseNotice, content: '짧은 공지 내용입니다.' } },
};

export const LongContent: Story = {
  args: {
    notice: {
      ...baseNotice,
      content:
        '2025학년도 하계 계절학기 수강신청 일정 및 유의사항 안내입니다. 수강신청 기간은 6월 16일(월) 09:00부터 6월 20일(금) 18:00까지이며, 수강 취소는 6월 23일(월)까지 가능합니다. 계절학기 수업료는 학점당 70,000원이며, 장학금 대상에서 제외됩니다. 추가 문의는 교학처(062-715-2114)로 연락 바랍니다.',
    },
  },
};

export const ManyTags: Story = {
  args: {
    notice: {
      ...baseNotice,
      tags: [
        '모집',
        '동아리',
        '스터디',
        '개발',
        '디자인',
        '기획',
        '기타',
        '추가태그1',
        '추가태그2',
      ],
    },
  },
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

export const WithAttachments: Story = {
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
