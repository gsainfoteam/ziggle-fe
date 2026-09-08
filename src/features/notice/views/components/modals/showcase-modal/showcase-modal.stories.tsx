import { useState } from 'react';

import { overlay } from 'overlay-kit';
import { fn } from 'storybook/test';

import { Button } from '@/common/components';

import ShowcaseModal from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

/** 한 게시글에 세로 포스터, 가로 배너, 스캔본이 섞여 올라온다. 같은 비율만 모인 경우가 오히려 드물다. */
const mockSources = [
  'https://placehold.co/900x1300/0b1440/ffffff?text=Poster',
  'https://placehold.co/1600x600/1f3a5f/ffffff?text=Banner',
  'https://placehold.co/1000x1000/2b2b3d/ffffff?text=Square',
];

/** 라이트박스는 흐려진 공지 페이지 위에 뜬다. 배경 없이는 그 느낌을 볼 수 없다. */
const PageBehind = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden p-10">
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="h-8 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-6 flex gap-3">
        {mockSources.map((src) => (
          <img key={src} src={src} alt="" className="h-48 w-auto rounded-lg" />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-gray-200 dark:bg-gray-800"
          style={{ width: `${90 - i * 6}%` }}
        />
      ))}
    </div>
  </div>
);

const ShowcaseDemo = ({
  initialIndex = 0,
  sources = mockSources,
  alt = '공지 이미지',
}: {
  initialIndex?: number;
  sources?: string[];
  alt?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative h-screen">
      <PageBehind />
      {!isOpen && (
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          ShowcaseModal 열기
        </Button>
      )}
      <ShowcaseModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          fn()();
        }}
        sources={sources}
        alt={alt}
        initialIndex={initialIndex}
      />
    </div>
  );
};

const meta = {
  title: 'Notice/ShowcaseModal',
  component: ShowcaseDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialIndex: { control: 'number' },
  },
} satisfies Meta<typeof ShowcaseDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initialIndex: 0 },
};

export const StartFromSecond: Story = {
  args: { initialIndex: 1 },
};

export const SingleImage: Story = {
  args: {
    sources: ['https://placehold.co/900x1300/0b1440/ffffff?text=Poster'],
    alt: '단일 이미지',
  },
};

/** 세로 스캔본이 이어지다 가로 지도가 끼는 식으로, 실제 첨부는 순서도 비율도 제각각이다. */
export const ManyImages: Story = {
  args: {
    sources: [
      'https://placehold.co/900x1300/0b1440/ffffff?text=1',
      'https://placehold.co/1240x1750/ffffff/333333?text=2',
      'https://placehold.co/1600x600/1f3a5f/ffffff?text=3',
      'https://placehold.co/1000x1000/2b2b3d/ffffff?text=4',
      'https://placehold.co/700x1600/3d2b2b/ffffff?text=5',
      'https://placehold.co/2000x900/1f3a5f/ffffff?text=6',
    ],
    alt: '첨부 이미지',
  },
};

/** 원본이 클수록 축소 폭이 크다. 작은 이미지와 나란히 두면 축소가 제대로 되는지 바로 보인다. */
export const ExtremeSizes: Story = {
  args: {
    sources: [
      'https://placehold.co/3000x4000?text=3000x4000',
      'https://placehold.co/320x240?text=320x240',
      'https://placehold.co/4000x1000?text=4000x1000',
    ],
    alt: '크기 차이가 큰 이미지',
  },
};

const ImperativeShowcase = () => (
  <div className="flex h-screen items-center justify-center">
    <Button
      variant="contained"
      onClick={() => {
        overlay.open(({ isOpen, close, unmount }) => (
          <ShowcaseModal
            isOpen={isOpen}
            onClose={close}
            onExitComplete={unmount}
            sources={mockSources}
            alt="공지 이미지"
          />
        ));
      }}
    >
      이미지 클릭(시뮬레이션)
    </Button>
  </div>
);

export const Imperative: Story = {
  render: () => <ImperativeShowcase />,
};
