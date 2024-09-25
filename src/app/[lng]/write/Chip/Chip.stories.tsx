import { Meta, StoryFn } from '@storybook/react';

import Chip from '.';

export default {
  title: 'non-shared/Chip',
  component: Chip,
  argTypes: {
    variant: {
      options: ['default', 'selected', 'deselected'],
      mapping: [undefined, 'selected', 'deselected'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) => {
  return <Chip {...args} />;
};

const args = {
  children: 'chip',
  className: '',
  variant: undefined,
  disabled: false,
};

export const Default = Template.bind({});
Default.args = { ...args };

export const Selected = Template.bind({});
Selected.args = { ...args, variant: 'selected' };

export const Deselected = Template.bind({});
Deselected.args = { ...args, variant: 'deselected' };
