import { ZiggleLogo } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/ZiggleLogo',
  component: ZiggleLogo,
  args: {
    variant: 'full',
    className: 'h-8',
  },
} satisfies Meta<typeof ZiggleLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const Compact: Story = {
  args: { variant: 'compact' },
};

export const Mark: Story = {
  args: { variant: 'mark' },
};

export const Dark: Story = {
  parameters: { themes: { themeOverride: 'dark' } },
  decorators: [
    (Story) => (
      <div className="dark bg-background rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};
