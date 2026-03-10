import type { Meta, StoryObj } from '@storybook/react-vite';

import { Home, Search, Settings } from 'lucide-react';

import { Popover } from './index';

import type { PopoverItem } from './type';

const sampleItems: PopoverItem[] = [
  { icon: Home, boldIcon: Home, label: '홈' },
  { icon: Search, boldIcon: Search, label: '검색' },
  { icon: Settings, boldIcon: Settings, label: '설정' },
];

interface PopoverStoryArgs {
  items: PopoverItem[];
  selectedIndex?: number;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}

const PopoverStoryWrapper = (args: PopoverStoryArgs) => (
  <Popover.Root {...args}>
    <Popover.Trigger
      icon={Home}
      boldIcon={Home}
      label="메뉴 열기"
      isSelected={args.selectedIndex === 0}
    />
  </Popover.Root>
);

const meta = {
  title: 'Common/Shared/Popover',
  component: PopoverStoryWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
    },
    selectedIndex: { control: 'number' },
  },
} satisfies Meta<typeof PopoverStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    selectedIndex: 0,
    placement: 'bottom',
  },
};

export const WithSelection: Story = {
  args: {
    items: sampleItems,
    selectedIndex: 1,
    placement: 'bottom',
  },
};
