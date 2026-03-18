import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeepLButton } from './deep-l-button';

const meta = {
  title: 'Features/Write/DeepLButton',
  component: DeepLButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    originalLanguage: {
      control: 'select',
      options: ['korean', 'english'],
    },
  },
} satisfies Meta<typeof DeepLButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromKorean: Story = {
  args: {
    originalLanguage: 'korean',
  },
};

export const FromEnglish: Story = {
  args: {
    originalLanguage: 'english',
  },
};
