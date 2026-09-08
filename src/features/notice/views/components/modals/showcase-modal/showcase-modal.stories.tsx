import { useState } from 'react';

import { overlay } from 'overlay-kit';
import { fn } from 'storybook/test';

import { Button } from '@/common/components';

import ShowcaseModal from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockSources = [
  'https://placehold.co/800x600?text=Image+1',
  'https://placehold.co/800x600?text=Image+2',
  'https://placehold.co/800x600?text=Image+3',
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
    sources: ['https://placehold.co/800x600?text=Single+Image'],
    alt: '단일 이미지',
  },
};

/** 실제 공지 이미지는 대부분 세로 포스터라 세로 여백 처리가 관건이다. */
export const PortraitPoster: Story = {
  args: {
    sources: [
      'https://placehold.co/900x1300/0b1440/ffffff?text=Poster+1',
      'https://placehold.co/900x1300/1a1a3a/ffffff?text=Poster+2',
    ],
    alt: '세로 포스터',
  },
};

/** 비율이 섞이면 이미지를 넘길 때 레이아웃이 튀기 쉽다. */
export const MixedAspectRatios: Story = {
  args: {
    sources: [
      'https://placehold.co/900x1300?text=Portrait',
      'https://placehold.co/1600x600?text=Wide',
      'https://placehold.co/800x800?text=Square',
    ],
    alt: '혼합 비율 이미지',
  },
};

export const OversizedImage: Story = {
  args: {
    sources: ['https://placehold.co/3000x4000?text=3000x4000'],
    alt: '초대형 이미지',
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
