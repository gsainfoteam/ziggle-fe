import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { LanguageTab } from './language-tab';

const meta = {
  title: 'Features/Write/LanguageTab',
  component: LanguageTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    writingTab: {
      control: 'radio',
      options: ['korean', 'english'],
    },
  },
} satisfies Meta<typeof LanguageTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  args: {
    writingTab: 'korean',
    setWritingTab: fn(),
  },
};

export const English: Story = {
  args: {
    writingTab: 'english',
    setWritingTab: fn(),
  },
};
