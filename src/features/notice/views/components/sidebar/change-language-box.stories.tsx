import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChangeLanguageBox } from './change-language-box';

const meta = {
  title: 'Features/Notice/Sidebar/ChangeLanguageBox',
  component: ChangeLanguageBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChangeLanguageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
