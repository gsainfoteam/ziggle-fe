import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from './index';

const meta = {
  title: 'Common/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'contained', 'disabled', undefined],
    },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: '아웃라인 버튼',
  },
};

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: '컨테인드 버튼',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: '비활성화',
  },
};

export const Animated: Story = {
  args: {
    variant: 'contained',
    animated: true,
    children: '애니메이션 버튼',
  },
};

export const WithClick: Story = {
  args: {
    variant: 'contained',
    children: '클릭해보세요',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '클릭해보세요' });

    await userEvent.click(button);

    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
