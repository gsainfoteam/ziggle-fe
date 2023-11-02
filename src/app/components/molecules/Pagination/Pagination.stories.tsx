import { Meta, StoryFn } from '@storybook/react';

import Pagination from '.';

export default {
  title: 'molecules/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export const Default: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};
Default.args = { pages: 30, page: 0 };
