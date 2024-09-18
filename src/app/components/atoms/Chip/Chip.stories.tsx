import { Meta, StoryFn } from '@storybook/react';

import Chip from '.';

export default {
  title: 'molecules/Chip',
  component: Chip,
} as Meta<typeof Chip>;

export const Default: StoryFn<typeof Chip> = (args) => <Chip {...args} />;
Default.args = { children: 'chip' };
