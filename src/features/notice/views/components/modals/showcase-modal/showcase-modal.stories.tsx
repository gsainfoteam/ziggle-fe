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
    <div>
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
