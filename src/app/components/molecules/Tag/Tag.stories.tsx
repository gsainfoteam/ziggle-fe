import { Meta, StoryFn } from '@storybook/react';

import { fallbackLng } from '@/app/i18next/settings';

import Tag from '.';

export default {
  title: 'molecules/Tag',
  component: Tag,
} as Meta<typeof Tag>;

export const Default: StoryFn<typeof Tag> = (args) => {
  return <Tag {...args} lng={fallbackLng} />;
};
Default.args = { name: 'tag' };
