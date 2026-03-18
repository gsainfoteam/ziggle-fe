import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import ShowcaseModal from './showcase-modal';

const meta = {
  title: 'Features/Notice/ShowcaseModal',
  component: ShowcaseModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialIndex: { control: 'number' },
  },
} satisfies Meta<typeof ShowcaseModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockSources = [
  'https://placehold.co/800x600?text=Image+1',
  'https://placehold.co/800x600?text=Image+2',
  'https://placehold.co/800x600?text=Image+3',
];

export const Default: Story = {
  args: {
    sources: mockSources,
    alt: '공지 이미지',
    onHide: fn(),
    initialIndex: 0,
  },
};

export const StartFromSecond: Story = {
  args: {
    sources: mockSources,
    alt: '공지 이미지',
    onHide: fn(),
    initialIndex: 1,
  },
};

export const SingleImage: Story = {
  args: {
    sources: ['https://placehold.co/800x600?text=Single+Image'],
    alt: '단일 이미지',
    onHide: fn(),
  },
};
