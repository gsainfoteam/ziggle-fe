import { Meta, StoryFn } from '@storybook/react';

import HighlightedText from '.';

export default {
  title: 'shared/HilightedText',
  component: HighlightedText,
} as Meta<typeof HighlightedText>;

const Template: StoryFn<typeof HighlightedText> = (args) => {
  return <HighlightedText {...args} />;
};

const args = {
  children: 'Hello World',
  query: 'World',
};

export const Default = Template.bind({});
Default.args = { ...args };

export const NoMatch = Template.bind({});
NoMatch.args = { ...args, query: 'Something Else' };
