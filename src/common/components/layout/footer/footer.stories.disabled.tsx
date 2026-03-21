import { Footer } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <div className="flex-1" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
