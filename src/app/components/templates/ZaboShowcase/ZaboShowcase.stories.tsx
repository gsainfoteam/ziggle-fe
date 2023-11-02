import { StoryFn } from '@storybook/react';

import ZaboShowcase from '.';

export default {
  title: 'temlates/ZaboShowcase',
  component: ZaboShowcase,
};

export const Default: StoryFn<typeof ZaboShowcase> = (args) => (
  <ZaboShowcase {...args} />
);
Default.args = {
  alt: 'ZaboShowcase',
  srcs: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/230/300',
    'https://picsum.photos/240/300',
    'https://picsum.photos/250/300',
    'https://picsum.photos/260/300',
  ],
};
