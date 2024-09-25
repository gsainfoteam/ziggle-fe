import { Meta, StoryFn } from '@storybook/react';

import Tag from '.';

export default {
  title: 'shared/Tag',
  component: Tag,
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => {
  return <Tag {...args} />;
};

const args = {
  name: 'tag',
};

export const Default = Template.bind({});
Default.args = { ...args };
