import { Meta, StoryFn } from '@storybook/react';

import Pagination from '.';

export default {
  title: 'shared/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

export const Default: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};
Default.args = { items: 35, itemsPerPage: 10, page: 0 };
