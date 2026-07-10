import { useState } from 'react';

import Pagination from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

interface PaginationStoryProps {
  items: number;
  itemsPerPage: number;
  page: number;
}

const PaginationStory = ({ items, itemsPerPage, page }: PaginationStoryProps) => {
  const [current, setCurrent] = useState(page);
  return (
    <Pagination
      items={items}
      itemsPerPage={itemsPerPage}
      page={current}
      onPageChange={setCurrent}
    />
  );
};

const meta = {
  title: 'Notice/Pagination',
  component: PaginationStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'number' },
    itemsPerPage: { control: 'number' },
    page: { control: 'number' },
  },
} satisfies Meta<typeof PaginationStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 0,
  },
};

export const MiddlePage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 4,
  },
};

export const LastPage: Story = {
  args: {
    items: 100,
    itemsPerPage: 10,
    page: 9,
  },
};

export const FewItems: Story = {
  args: {
    items: 5,
    itemsPerPage: 10,
    page: 0,
  },
};
