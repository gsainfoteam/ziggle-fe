import { Meta, StoryFn } from '@storybook/react';

import Button from '.';

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['default', 'contained', 'outlined'],
      mapping: [undefined, 'contained', 'outlined'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
};

const args = {
  children: 'button',
  animated: false,
  className: '',
};

export const Default = Template.bind({});
Default.args = { ...args };

export const Contained = Template.bind({});
Contained.args = { ...args, variant: 'contained' };

export const Outlined = Template.bind({});
Outlined.args = { ...args, variant: 'outlined' };
