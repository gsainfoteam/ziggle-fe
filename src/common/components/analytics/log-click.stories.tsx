import type { Meta, StoryObj } from '@storybook/react-vite';

import { LogClick } from './log-click';

const meta = {
  title: 'Common/Analytics/LogClick',
  component: LogClick,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    eventName: { control: 'text' },
  },
} satisfies Meta<typeof LogClick>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eventName: 'button_click',
    properties: { page: 'test' },
    children: <button type="button">클릭 시 콘솔에 로그 출력</button>,
  },
};
