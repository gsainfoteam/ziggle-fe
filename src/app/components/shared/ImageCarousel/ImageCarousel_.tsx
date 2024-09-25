import { Meta, StoryFn } from '@storybook/react';

import ImageCarousel from '.';

export default {
  title: 'shared/ImageCarousel',
  component: ImageCarousel,
} as Meta<typeof ImageCarousel>;

const Template: StoryFn<typeof ImageCarousel> = (args) => (
  <ImageCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  alt: 'ImageCarousel',
  srcs: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/230/300',
    'https://picsum.photos/240/300',
    'https://picsum.photos/250/300',
    'https://picsum.photos/260/300',
  ],
};
