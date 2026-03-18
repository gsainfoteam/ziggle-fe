import { fn } from 'storybook/test';

import { Toggle } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSwitched: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    isSwitched: false,
    onSwitch: fn(),
  },
};

export const On: Story = {
  args: {
    isSwitched: true,
    onSwitch: fn(),
  },
};

export const Disabled: Story = {
  args: {
    isSwitched: false,
    disabled: true,
    onSwitch: fn(),
  },
};
