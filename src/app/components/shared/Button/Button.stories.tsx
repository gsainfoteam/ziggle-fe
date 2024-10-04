import { Meta, StoryFn } from '@storybook/react';

import Button from '.';

export default {
  title: 'shared/Button',
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
  className: '',
  variant: undefined,
  animated: false,
};

export const Default = Template.bind({});
Default.args = { ...args };

export const Outlined = Template.bind({});
Outlined.args = { ...args, variant: 'outlined' };

export const Contained = Template.bind({});
Contained.args = { ...args, variant: 'contained' };

export const Disabled = Template.bind({});
Disabled.args = { ...args, variant: 'disabled' };
